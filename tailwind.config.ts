import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#0f3e23',
          950: '#052312',
        },
        suumo: {
          light: '#22c55e',
          DEFAULT: '#00a854',
          dark: '#008836',
          orange: '#ff6b00',
          red: '#d92038',
          bg: '#f4f7f6',
        },
        cream: {
          50: '#fdfcf9',
          100: '#f8f5ee',
          200: '#ede8dd',
          300: '#ddd4c2',
        },
        matcha: {
          50: '#f2f8f5',
          100: '#e1f0e8',
          200: '#c5e2d3',
          500: '#1f7a52',
          600: '#166140',
          700: '#104930',
        },
        coral: {
          50: '#fff5f3',
          100: '#ffe8e4',
          200: '#ffd3cb',
          400: '#ff7b63',
          500: '#ff5a3c',
          600: '#e64426',
        },
        lavender: {
          50: '#faf8ff',
          100: '#f3effe',
          200: '#e6dcfe',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        line: {
          DEFAULT: '#06C755',
          hover: '#05b34c',
          light: '#e8f9ee',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans-jp)',
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Hiragino Sans"',
          '"Hiragino Kaku Gothic ProN"',
          '"Yu Gothic"',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
