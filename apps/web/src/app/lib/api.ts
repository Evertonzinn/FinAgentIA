export async function getKpis() {
  const res = await fetch("http://localhost:8000/v1/kpis", {
    next: { revalidate: 5 },
  });
  return res.json();
}