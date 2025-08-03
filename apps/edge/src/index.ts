export default {
  async fetch(req: Request, env: any): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/agent" && req.method === "POST") {
      const { q } = await req.json();
      // TODO: call OpenRouter (inject env.OPENROUTER_KEY)
      return new Response(JSON.stringify({ reply: `echo: ${q || ''}` }), {
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" }
      });
    }
    return new Response("ok");
  }
}
