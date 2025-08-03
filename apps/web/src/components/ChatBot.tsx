'use client';

import { useEffect, useRef, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'agent';
  text: string;
};

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!data?.reply) {
        throw new Error('Resposta vazia da IA');
      }

      const reply: ChatMessage = { role: 'agent', text: data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error('Erro ao conectar com a IA:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'Erro ao conectar com a IA' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '1rem', maxWidth: 600 }}>
      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.role === 'user' ? 'Você: ' : 'IA: '}</strong>
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          aria-label="Campo de mensagem"
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          style={{ flex: 1, padding: '0.5rem' }}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
