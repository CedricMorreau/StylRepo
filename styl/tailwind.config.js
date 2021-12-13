module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        offWhite: "#ECF3E7",
        black: "#212121",
      },
      fontFamily: {
        ivy: "'ivypresto-display',serif;",
        avenirMedium: "'avenirMedium',sans-serif;",
        avenirMediumItalic: "'avenirMediumItalic',sans-serif;'",
        avenirDemiBold: "'avenirDemiBold',sans-serif;'",
      },
      animation: {
        slide: 'slide 2s'
      },
      keyframes: {
        slide : {
          '0%': {
            transform: 'translateY(-120%) '
          },
          '100%': {
            transform: 'translateY(0)'
          }
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

