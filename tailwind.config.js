/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          800: '#1E293B',
          900: '#0F172A',
        },
        violet: {
          100: '#EDE9FE',
          600: '#7C3AED',
        },
        rose: {
          500: '#F43F5E',
        },
        lime: {
          500: '#84CC16',
        },
        amber: {
          800: '#92400E',
        },
        primary: "#7C3AED",  // violet/600
        "primary-light": "#EDE9FE", // violet/100
        danger: "#F43F5E",   // rose/500
        success: "#BEF264",  // lime/300
        warning: "#92400E",  // amber/800
        gray: {
          light: "#F1F5F9", // slate/100
          DEFAULT: "#CBD5E1", // slate/300
          dark: "#1E293B", // slate/800
        },
        text: {
          DEFAULT: "#111827",
          dark: "#111827",
        },
      },
    },
  },
  plugins: [],
};
