import typescriptEslint from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    plugins: {
      typescriptEslint: typescriptEslint,
    },
    rules: {
      'typescriptEslint/indent': 'error',
    },
  },
  eslintConfigPrettier,
]
