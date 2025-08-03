/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/**/*.{js,ts,jsx,tsx}', // Garante que todos os arquivos do app web sejam escaneados
    './packages/**/*.{js,ts,jsx,tsx}', // Se usar componentes compartilhados
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        bg: '#F9FAFB',
        card: '#FFFFFF',
        text: '#111827',
        success: '#10B981',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
