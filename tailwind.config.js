module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: { extend: {
      colors: {
        primary: "#0f766e", // teal
        accent: "#0ea5e9",  // sky
        danger: "#ef4444",
        muted: "#6b7280"
      },
      boxShadow: {
        soft: "0 6px 18px rgba(15,23,42,0.08)"
      }
    }},
  plugins: [
  require('@tailwindcss/forms')({
    strategy: 'class'
  })
],
}
