import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#090911",
        secondary: "#13131b",
      },
    },
  },
  plugins: [],
};
export default config;
