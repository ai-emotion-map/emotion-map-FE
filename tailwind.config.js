/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        scrollLeft: "scrollLeft linear infinite",
        scrollRight: "scrollRight linear infinite",
      },
      fontFamily: {
        suit: ["SUIT-Regular", "sans-serif"],
        nunito: ['Nunito"', "sans-serif"],
        onepick: ['"YOnepickTTF-Bold"', "sans-serif"],
      },
      colors: {
        "main-green": "#6FCF97",
        "sub-green": "#B7E0C2",
        "hover-green": "#23a559ff",
        background: "#fafafa",
        "marker-yellow": "#fff386",
        "marker-blue": "#a2beff",
        "marker-orange": "#ff897d",
        "marker-purple": "#c26dde",
        "marker-pink": "#ff9fc4",
        "marker-green": "#8fd298",
        
        "feed-blue1": "#7276ecff",
        "feed-blue2": "#99a6ffff",
        "feed-blue3":"#90a6ffff",
        "feed-green1": "#57e3f3e4",
        "feed-green2": "#6ecf71ff",
        "feed-green3": "#54d8b9ff",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
