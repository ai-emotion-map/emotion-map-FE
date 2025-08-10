/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suit: ["SUIT-Regular", "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
      colors: {
        // 컬러 등록
        "main-green": "#6FCF97",
        "sub-green": "#B7E0C2", // 연한 그린
        background: "#FAFAFA", // 배경색
      },
    },
  },
  plugins: [],
};
