import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1C1C1C",
          light: "#222222",
        },
        surface: {
          DEFAULT: "#222222",
          raised: "#2E2E2E",
        },
        accent: {
          DEFAULT: "#22D3EE",
        },
        border: {
          DEFAULT: "#3A3A3A",
        },
        text: {
          DEFAULT: "#F4F4F4",
          secondary: "#A0A0A0",
          muted: "#6B6B6B",
        },
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "counter": "counter 2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
