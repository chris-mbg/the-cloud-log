module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
      heading: ["Josefin Sans", "serif"]
    },
    extend: {
      colors: {
        primary: "#11172dff",
        secondary: "#878a98ff",
        neutral: "#f5f5f5ff",
        smoke: "#000000cc"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
