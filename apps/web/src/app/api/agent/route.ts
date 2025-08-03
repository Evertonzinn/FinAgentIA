// src/app/api/agent/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const apikey = process.env.OPENAI_API_KEY;

  if (!apikey) {
    return NextResponse.json({ error: 'Chave da OpenAI não configurada.' }, { status: 500 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error('Erro da OpenAI:', data);
      return NextResponse.json({ error: 'Erro da OpenAI', detail: data }, { status: 500 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error('Erro ao chamar a IA:', err);
    return NextResponse.json({ error: 'Erro interno ao chamar a IA' }, { status: 500 });
  }
}
  