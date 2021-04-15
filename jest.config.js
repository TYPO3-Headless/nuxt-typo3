module.exports = {
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['lib/**/*.js', '!lib/plugin.js'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!nuxt-i18n).+\\.js$']
}
