/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        lavaggio: {
          yellow: "#F5D033",
          "yellow-dark": "#D4B022",
          "yellow-light": "#FBE06B",
          red: "#B31824",
          "red-dark": "#8B121C",
          "red-light": "#D82332",
          onyx: "#08080a",
          dark: "#050505",
        },
        primary: {
          DEFAULT: "#F5D033",
          red: "#B31824",
          glow: "rgba(245, 208, 51, 0.4)",
        },
      },
      fontFamily: {
        yamama: ['"Alyamama Variable"', 'Alyamama', 'sans-serif'],
        sans: ['"Alyamama Variable"', 'Alyamama', '-apple-system', 'sans-serif'],
        display: ['"Alyamama Variable"', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px rgba(245, 208, 51, 0.35)',
        'glow-red': '0 0 25px rgba(179, 24, 36, 0.45)',
        'glass': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}
