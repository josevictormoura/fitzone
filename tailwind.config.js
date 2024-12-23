/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        lemo: ['Lemon', 'cursive']
      },
      backgroundImage: {
        "home": "url(/assets/img/main.jpg)",
        "imc": "url(/assets/img/imc-bg.jpg)",
        "azul-dark": "#172554",
        "azul": "#48cfff",
        "gradient": "linear-gradient(to right, #b5ecff, #48cfff)",
        "gradient-2": "linear-gradient(to bottom, #48cfff 5%, #fff 5%)"
      },
      colors: {
        "azul": '#48cfff'
      },
      boxShadow: {
        "sombra": "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      }
    },
  },
  plugins: [],
}

