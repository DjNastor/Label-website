
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0F1E',
          light: '#111827',
          lighter: '#1F2937'
        },
        gold: {
          DEFAULT: '#F5A623',
          hover: '#D48806',
          light: '#FDE68A'
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
