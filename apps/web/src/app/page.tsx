import { getKpis } from "./lib/api";
import KpiCard from "../components/KpiCard"

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function Home() {
  const kpis = await getKpis();

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-text">FinAgent.ai</h1>
        <p className="text-gray-600 mb-10">MVP – painel inicial</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Saldo atual" value={fmt(kpis.saldo)} />
          <KpiCard title="Receitas últimos 30d" value={fmt(kpis.receita30)} />
          <KpiCard title="Despesas últimos 30d" value={fmt(kpis.despesas30)} />
        </div>
      </div>
    </div>
  );
}
