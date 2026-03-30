/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B21FF',
          light: '#8B5CF6',
          dark: '#5B1BD7',
        },
        background: '#0A0812',
        elevated: 'rgba(255,255,255,0.03)',
        glass: 'rgba(255,255,255,0.06)',
        text: {
          DEFAULT: '#E8E3F0',
          dim: '#A09AB8',
          muted: '#6B6580',
        }
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '12px',
        lg: '24px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
