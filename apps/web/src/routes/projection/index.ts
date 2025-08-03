// apps/api/routes/projection/index.ts
import { FastifyInstance } from 'fastify';
import z from 'zod';

const TransactionSchema = z.object({
  date: z.string().datetime(),
  description: z.string(),
  amount: z.number(),
});

const BodySchema = z.object({
  transactions: z.array(TransactionSchema),
});

export async function projectionRoutes(app: FastifyInstance) {
  app.post('/projection', async (req, res) => {
    const body = BodySchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).send({ error: 'Dados inválidos', issues: body.error.format() });
    }

    const transactions = body.data.transactions;

    // Agrupar por data (yyyy-mm-dd)
    const dailyTotals: Record<string, number> = {};
    for (const tx of transactions) {
      const date = tx.date.slice(0, 10); // yyyy-mm-dd
      dailyTotals[date] = (dailyTotals[date] || 0) + tx.amount;
    }

    // Ordenar datas
    const sortedDates = Object.keys(dailyTotals).sort();
    const values = sortedDates.map((d) => dailyTotals[d]);

    // Calcular média simples
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    // Projeção simples: manter a média para os próximos 30 dias
    const today = new Date();
    const projection: { date: string; value: number }[] = [];

    for (let i = 1; i <= 30; i++) {
      const next = new Date(today);
      next.setDate(today.getDate() + i);

      projection.push({
        date: next.toISOString().slice(0, 10),
        value: avg,
      });
    }

    return res.send({
      days: sortedDates.map((d) => ({ date: d, value: dailyTotals[d] })),
      projection,
      avg,
    });
  });
}
