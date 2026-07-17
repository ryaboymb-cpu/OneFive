/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        of: {
          bg: '#060d1a',
          surface: '#0f1d35',
          card: '#132238',
          'card-hover': '#1a2e4d',
          accent: '#2b7fff',
          'accent-light': '#60a5fa',
          muted: '#8b9db8',
          border: 'rgba(148, 163, 184, 0.08)',
          danger: '#ef4444',
          success: '#22c55e',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(43,127,255,0.15)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
