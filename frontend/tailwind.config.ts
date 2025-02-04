import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'arriere-plan': '#ffffff',
        'arriere-plan-popup' : 'var(--arriere-plan-popup)',
        'premier-plan': '#000000',
        'clair': '#dfdddd',
        'clair-hover': '#bcbbbb',
        'vert-uqac': '#6b8915',
        'vert-clair-uqac': '#95b147',
        'valid': '#6b8915',
        'invalid': '#ff0000',
        'disabled': '#939f70',
      },
    },
  },
  plugins: [],
} satisfies Config;
