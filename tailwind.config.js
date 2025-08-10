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
        "marker-yellow": "#fff386",
        "marker-blue": "#a2beff",
        "marker-orange": "#ff897d",
        "marker-purple": "#c26dde",
        "marker-pink": "#ff9fc4",
        "marker-green": "#8fd298",
      },
    },
  },
  plugins: [],
};
