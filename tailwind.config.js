/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColors: {
          100: "rgb(79 70 229)",
        },
      },
    },
    boxShadow: {
      "main-shadow":
        " rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;",
      "standard-shadow":
        "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
    },
    screens: {
      "max-vsm": { max: "325px" },
      "max-ssm": { max: "374px" },
      "max-msm": { max: "426px" },
      "max-tsm": { max: "768px" },
      "max-lap": { max: "1025px" },
      "max-wide": { max: "1440px" },
    },
  },
  plugins: [],
};
