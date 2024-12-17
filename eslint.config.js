import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      ...eslintConfigPrettier.rules,
      // Prettier integration
      'prettier/prettier': 'error',

      // StandardJS style
      semi: ['error', 'never'],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true }
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      indent: ['error', 2],
      'no-tabs': 'error',

      // Private/protected methods
      'no-underscore-dangle': ['error', { allowAfterThis: true }],

      // Add null checks or use optional chaining
      'no-unsafe-optional-chaining': 'error',
      eqeqeq: ['error', 'always'],

      // Miscellaneous rules
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
]
