module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: ['lib/**/*.js', '!lib/plugin.js'],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!nuxt-i18n|).+\\.js$',
    '/node_modules/(?!vee-validate/dist/rules)'
  ]
}
