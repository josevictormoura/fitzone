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
        "azul-footer": "#0E335D",
        "grey-table": "#E8E8E8",
        "azul": "#48cfff",
        "gradient": "linear-gradient(to right, #b5ecff, #48cfff)",
        "gradient-2": "linear-gradient(to bottom, #48cfff 5%, #fff 5%)"
      },
      colors: {
        "azul": '#48cfff',
        "azul-escuro":"#0000FF",
        "azul-ciano":"#48CFFF",
        "verde-claro": "#65a30d",
        "verde": "#84cc16",
        "laranja-claro": "#fbbf24",
        "laranja": "#b45309",
        "vermelho": "#dc2626",
        "vermelho-claro": "#ef4444"
      },
      boxShadow: {
        "sombra": "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      }
    },
  },
  plugins: [],
}