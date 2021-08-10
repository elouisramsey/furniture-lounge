module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins, sans-serif'],
        PoppinsMid: ['Poppins medium'],
        PoppinsBold: ['Poppins bold'],
        PlayFairDisplay: ['PlayFairDisplay']
      },
      backgroundColor: {
        primary: '#89bdf9',
        light: '#f5f5f5',
        'light-200': '#f0f0f0',
        'light-300': '#e8e8e8',
        heroBg: '#DDC0AE',
        cateBg: '#f4fafb',
        orderSummary: '#f7fbfd',
        success: '#3bbc9a',
        cartBG: 'rgb(197 195 195 / 40%);'
      },
      textColor: {
        heroHead: 'rgba(0, 0, 0, 0.8)',
        softGrey: '#797979',
        lightGrey: '#a5a5a5',
        borderColor: '#d6d6d6'
      },
      fontSize: {
        tiny: '.687rem'
      },
      rotate: {
        m45: '-45deg'
      },
      translate: {
        200: '200%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}
