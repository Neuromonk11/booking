/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#f5f5f5",
        "primary": "#d95700",
        "secondary": "#d9722c",
        "additional": "#cc5200",
        "title": "#44425a",
        "available": "#90ee90"
      },
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "320px",
      md: "768px",
    },
    fontSize: {
      sm: ['9px', '14px'],
      xs: ['12px', '14px'],
      xl2: ['1.5rem', '2rem'],
      xl3: ['1.875rem', '2.25rem'],
    }    
  },
  plugins: [],
}
