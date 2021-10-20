module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: ['eslint:recommended', '@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: ['nuxt'],
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  }
}
