module.exports = {
  content: [
    './index.html',
    './src/**/*.{svelte}',
  ],
  purge: [
    './index.html',
    './src/**/*.{svelte}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
  },
}
