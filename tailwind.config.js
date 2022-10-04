require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs']
})

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const themes = require('./app/components/atoms/Theme/themes')
const {flattenObject} = require('./app/components/atoms/Theme/utils')

const withOpacityValue = variable => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

const colorNames = Object.keys(flattenObject(themes.standard.colors, '-'))
const colors = colorNames.reduce((acc, color) => ({
  ...acc,
  [color]: withOpacityValue(`--colors-${color}`)
}), {})

module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 500ms linear forwards',
        'head-shake': 'head-shake 1s ease-in-out, pulse 2s',
        'spin-slow': 'spin 20s linear infinite',
      },
      boxShadow: {
        DEFAULT: '0px 0px 8px rgba(0, 0, 0, 0.07), 0px 1px 1px rgba(0, 0, 0, 0.14)',
        md: '2px 4px 12px rgba(0, 0, 0, 0.14), 1px 2px 2px rgba(0, 0, 0, 0.14)'
      },
      colors,
      fontSize: {
        '4xl': ['1.875rem', {lineHeight: '2.25rem'}], // 30px, 36px
        '3xl': ['1.5rem', {lineHeight: '1.875rem'}], // 24px, 30px
        '2xl': ['1.125rem', {lineHeight: '1.5rem'}], // 18px, 24px
        'xl': ['0.875rem', {lineHeight: '1.25rem'}], // 14px, 20px
        'lg': ['0.8125rem', {lineHeight: '1rem'}], // 13px, 16px
        'base': ['0.75rem', {lineHeight: '0.875rem'}], // 12px, 14px
        'sm': ['0.6875rem', {lineHeight: '0.75rem'}], // 11px, 12px
        'xs': ['0.625rem', {lineHeight: '0.75rem'}] // 10px, 12px
      },
      keyframes: {
        'fade-in': {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        },
        'pulse': {
          '0%, 100%': {background: '#F3F5F6'},
          '50%': {background: '#212121'}
        },
        'head-shake': {
          '0%': {transform: 'translateX(0px)'},
          '6.5%': {transform: 'translateX(-6px)'},
          '16.5%': {transform: 'translateX(5px)'},
          '31.5%': {transform: 'translateX(-3px)'},
          '43.5%': {transform: 'translateX(2px)'},
          '50%': {transform: 'translateX(0px)'},
        }
      },
      zIndex: {
        100: '100'
      },
    },
    fontFamily: {
      sans: ['Bull', 'Helvetica', 'Arial', 'sans-serif'],
      'sans-text': ['"Bull Text"', 'Helvetica', 'Arial', 'sans-serif']
    },
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({addComponents, addUtilities, addVariant, e}) => {
      addComponents({
        '.font-page-heading': {'@apply font-["Futura_Com","AvenirNextCondensed-Bold","Ubuntu_Condensed",sans-serif] text-4xl font-bold uppercase tracking-tighter': ''},
        '.font-heading-x-large': {'@apply text-3xl font-bold': ''},
        '.font-heading-large': {'@apply text-2xl font-bold': ''},
        '.font-heading-medium': {'@apply text-xl font-bold': ''},
        '.font-heading-small': {'@apply text-base font-bold': ''},
        '.font-heading-small-caps': {'@apply text-sm font-bold uppercase': ''},
        '.font-button-text': {'@apply text-base font-bold': ''},
        '.font-menu-text': {'@apply text-base': ''},
        '.font-badge-text': {'@apply font-sans-text text-base': ''},
        '.font-chip-text': {'@apply text-xs font-bold uppercase': ''},
        '.font-text': {'@apply font-sans-text text-lg': ''},
        '.font-text-small': {'@apply font-sans-text text-xs': ''},
        '.font-label': {'@apply text-xs font-bold': ''},
      })

      addUtilities({
        '.bg-gradient-primary': {'@apply from-primary to-[#17427C]': ''},
        '.bg-gradient-gray': {'@apply from-[#ECECEC] to-[#FFFFFF]': ''},
        '.bg-gradient-red': {'@apply from-[#FFE6EC] to-[#FFFFFF]': ''},
        '.bg-gradient-orange': {'@apply from-[#FFF6E8] to-[#FFFFFF]': ''},
        '.bg-gradient-yellow': {'@apply from-yellow-light to-[#FFFFFF]': ''},
        '.bg-gradient-blue': {'@apply from-[#EAF7FF] to-[#FFFFFF]': ''},
        '.bg-gradient-green': {'@apply from-green-light to-[#FFFFFF]': ''},
        '.bg-gradient-emerald': {'@apply from-emerald-light to-[#FFFFFF]': ''},
        '.bg-gradient-silver': {'@apply from-silver to-[#FFFFFF]': ''},
        '.number-input': {
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0'
          },
          '&': {
            '-moz-appearance': 'textfield'
          }
        }
      })

      /*
       * Use the specific modifier to raise css selector specificity.
       * Can be handy for conditional classes colliding with default classes with higher specificiy.
       * e.g. "specific:bg-blue-500" results in the selector ".specific\:bg-blue-500.specific\:bg-blue-500"
       */
      addVariant('specific', ({modifySelectors, separator}) => {
        modifySelectors((props) => {
          return `.${e(`specific${separator}${props.className}`)}[class*=specific]`
        })
      })
    })
  ]
}
