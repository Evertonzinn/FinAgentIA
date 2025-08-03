import ChatBox from "src/components/ChatBot";

// apps/web/src/app/layout.tsx
export const metadata = {
  title: 'FinAgent.ai',
  description: 'MVP – agente financeiro inteligente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="relative min-h-screen bg-bg text-gray-900">
        {children}
        <ChatBox />
      </body>
    </html>
  );
}
