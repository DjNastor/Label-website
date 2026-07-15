export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        maputo: ['Maputo', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'league-spartan': ['"League Spartan"', 'sans-serif'],
      },
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
      dropShadow: {
        'text': '0 2px 2px rgba(0, 0, 0, 0.5)',
      }
    }
  },
  plugins: [],
}