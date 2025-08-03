import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { NormalizedTransaction } from '@/types/NormalizedTransaction';

// Determina o tipo de arquivo e encaminha para o parser correspondente
export async function parseFinancialFile(file: File): Promise<NormalizedTransaction[]> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv') {
    return await parseCSV(file);
  } else if (extension === 'xlsx') {
    return await parseXLSX(file);
  } else {
    throw new Error('Formato de arquivo não suportado');
  }
}

// Parser para arquivos CSV usando PapaParse
async function parseCSV(file: File): Promise<NormalizedTransaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<unknown>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        try {
          const data = normalize(results.data);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
}

// Parser para arquivos XLSX usando SheetJS
async function parseXLSX(file: File): Promise<NormalizedTransaction[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<unknown>(sheet);
  return normalize(json);
}

// Função de normalização universal para CSV/XLSX
function normalize(raw: unknown[]): NormalizedTransaction[] {
  return raw.map((item) => {
    const row = item as Record<string, any>;

    const keys = Object.keys(row).reduce<Record<string, string>>((acc, key) => {
      acc[key.toLowerCase()] = key;
      return acc;
    }, {});

    const dateKey = keys['data'] || keys['date'] || keys['data de pagamento'] || keys['vencimento'] || Object.values(keys).find(k => k.toLowerCase().includes('data')) || 'data';
    const amountKey = keys['valor'] || keys['amount'] || keys['value'] || Object.values(keys).find(k => k.toLowerCase().includes('valor')) || 'valor';
    const descKey = keys['descricao'] || keys['description'] || keys['desc'] || Object.values(keys).find(k => k.toLowerCase().includes('desc')) || 'descricao';

    const rawDate = row[dateKey];
    const rawAmount = row[amountKey];

    const date = new Date(rawDate).toISOString();

    const amount = parseFloat(
      String(rawAmount).replace(/[^\d\-.,]/g, '').replace(',', '.')
    );

    return {
      date,
      description: row[descKey] || 'Sem descrição',
      amount: isNaN(amount) ? 0 : amount,
    };
  });
}
