module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          {
            pattern: '{react,react-native}',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@components/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '{api,components,context,hooks,navigations,screens,utils,}/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: 'types/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: 'theme/**',
            group: 'internal',
            position: 'after'
          },
          {

            pattern: '@**',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      }
    ]
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
