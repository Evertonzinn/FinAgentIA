interface KpiCardProps {
  title: string;
  value: string;
}

export default function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6 w-full max-w-sm border border-gray-200">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
