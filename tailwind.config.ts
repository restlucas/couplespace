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
        background: "#020617",
        foreground: "var(--foreground)",
        "foreground-light": "#232323",
        border: "#334155",
        "pink-normal": "#e0e8fc",
        "pink-neutral": "#404f77",
        facebook: "#4267B2",
        google: "#DB4437",
      },
      keyframes: {
        fadeRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "fade-right": "fadeRight 0.35s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
