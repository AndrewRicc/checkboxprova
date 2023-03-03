/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: [ 'Rubik', 'ui-sans-serif', 'system-ui' ],
      body: [ 'Open Sans', 'ui-sans-serif', 'system-ui' ]
    },
    extend: {
      borderRadius: {
        evt: '1.875rem'
      },
      colors: {
        primary: '#E30000',
        secondary: '#FDECEE',
        dark: '#131313',
        evtgray: {
          100: '#FCFCFC',
          150: '#eeeeee',
          200: '#d3d3d3'
        },
        evtbg: {
          100: '#F8F8F8',
        },
        evttext: {
          400: '#707070',
          500: '#131313'
        },
        evtsuccess: '#44D788',
        evtwarning: '#FFBB01',
        evtdanger: '#FA461C'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
