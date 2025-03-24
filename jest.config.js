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
    'node_modules/(?!(htm|pearpass-lib-ui-theme-provider|pearpass-lib-ui-react-components|pear-apps-lib-ui-react-hooks|pear-apps-utils-validator|pearpass-lib-vault|pearpass-lib-vault-desktop|pearpass-utils-password-check|pearpass-utils-password-generator|pear-apps-utils-pattern-search|pear-apps-utils-avatar-initials)/)'
  ]
}
