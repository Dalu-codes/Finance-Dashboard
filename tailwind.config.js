/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#272727',      // primary headings, large text
        'green-dk': '#118B1D', // donut ring, investment icons
        body: '#535353',     // body labels, secondary text
        'green-lt': '#2BA000', // progress bars, savings bars, +Add
        stroke: '#EFEFEF',   // card borders, dividers, grid lines
        blue: '#0983B7',     // expense bars (chart), legend square
        red: '#EA0808',      // expense amounts (right panel)
        bg: '#F1F1F1',       // page background
        pink: '#FFB6E9',     // user avatar background
      },
      fontFamily: {
        heading: ['"Josefin Sans"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      letterSpacing: {
        heading: '-0.02em',
        body: '0em',
      },
      maxWidth: {
        page: '1280px',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}
