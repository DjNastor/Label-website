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
      },
      fontSize: {
        'tiny': '0.625rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      }
    }
  },
  plugins: [],
}