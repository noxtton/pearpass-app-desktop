export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^pearpass-lib-ui-theme-provider$':
      '<rootDir>/node_modules/pearpass-lib-ui-theme-provider/src/index.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(htm|pearpass-lib-ui-theme-provider)/)'
  ]
}
