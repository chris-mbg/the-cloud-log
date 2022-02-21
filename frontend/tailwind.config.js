module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Playfair Display", "serif"]
    },
    extend: {
      colors: {
        primary: "#11172d",
        secondary: "#878a98",
        neutral: "#f5f5f5"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
