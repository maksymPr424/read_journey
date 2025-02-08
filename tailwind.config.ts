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
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGray: "var(--lightGray)",
        grayPercent: "var(--grayPercent)",
        gray: "var(--gray)",
        lightDark: "var(--lightDark)",
        blue: "var(--blue)",
        green: "var(--green)",
        error: "var(--error)",
      },
    },
  },
  plugins: [],
} satisfies Config;
