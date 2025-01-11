/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customGreen: '#00CD8E',
        customDark: '#082638',
        customGray: '#979799',
        customLight: '#F0F0F0',
        textError: "#ff0000",
      
      },
      fontFamily: {
        sans: ['System'], 
        mono: ['Courier'], 
        serif: ['Georgia'], 
      },
    },
  },
  plugins: [],
}