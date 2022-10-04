module.exports = {
  plugins: [
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('./internal/scripts/postcss-enforce-media-queries.js'),
    require('autoprefixer'),
  ]
}
