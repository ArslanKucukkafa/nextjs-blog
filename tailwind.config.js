import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            code: {
              color: '#fff',
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#fff',
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require('@tailwindcss/typography')],
};
