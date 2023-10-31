import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.5625rem",
        sm: "0.6875rem",
        md: "1rem",
        xl: "1.1875rem",
        h6: "1.375rem",
        h5: "1.6875rem",
        h4: "2.125rem",
        h3: "2.6875rem",
        h2: "3.3125rem",
        h1: "4.1875rem",
      },
      colors: {
        grey: {
          50: "rgba(233, 233, 233, 1)",
          100: "rgba(185, 185, 185, 1)",
          200: "rgba(152, 152, 152, 1)",
          300: "rgba(184, 0, 0, 1)",
          400: "rgba(170, 0, 0, 1)",
          500: "rgba(35, 105, 242, 1)",
          600: "rgba(0, 0, 0, 1)",
          700: "rgba(0, 0, 0, 1)",
          800: "rgba(19, 58, 133, 1)",
          900: "rgba(15, 44, 102, 1)",
        },
        white: {
          50: "rgba(254, 254, 254, 1)",
          100: "rgba(255, 255, 255, 1)",
          200: "rgba(206, 0, 0, 1)",
          300: "rgba(250, 250, 245, 1)",
          400: "rgba(170, 0, 0, 1)",
          500: "rgba(247, 248, 240, 1)",
          600: "rgba(0, 0, 0, 1)",
          700: "rgba(0, 0, 0, 1)",
          800: "rgba(0, 0, 0, 1)",
          900: "rgba(0, 0, 0, 1)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
