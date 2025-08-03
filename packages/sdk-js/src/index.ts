export async function createScenario(baseUrl: string, payload: { name: string; params: any }) {
  const r = await fetch(`${baseUrl}/v1/scenarios`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return r.json();
}
