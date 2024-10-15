/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      padding: {
        0.8: "0.8px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
