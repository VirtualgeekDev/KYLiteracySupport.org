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
        navy: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#627D98",
          500: "#334E68",
          600: "#243B53",
          700: "#1B365D", // Primary brand navy
          800: "#102A43",
          900: "#0B1D33",
          950: "#06101E",
        },
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706", // Accent warm gold
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        surface: {
          light: "#F8FAFC",
          muted: "#F1F5F9",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -1px rgba(15, 33, 55, 0.08), 0 1px 4px -1px rgba(15, 33, 55, 0.04)",
        "card-hover": "0 10px 25px -5px rgba(15, 33, 55, 0.12), 0 8px 10px -6px rgba(15, 33, 55, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
