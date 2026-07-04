import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // Absolute black & white. No accent colors.
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      transparent: "transparent",
      current: "currentColor",
      // Single hairline gray, borders only.
      hairline: "rgba(0,0,0,0.12)",
    },
    extend: {
      fontFamily: {
        // Times New Roman first (native on macOS/Windows); Tinos as the
        // self-hosted fallback so Linux/Android render an identical serif.
        serif: ["'Times New Roman'", "var(--font-tinos)", "Times", "serif"],
      },
      letterSpacing: {
        label: "0.24em",
        wide2: "0.14em",
      },
      maxWidth: {
        editorial: "72rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
