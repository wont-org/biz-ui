const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    curly: ['error', 'all'],
    'no-else-return': [
      2,
      {
        allowElseIf: false,
      },
    ],
    semi: ['error', 'always'],
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-unused-expressions': [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'react/no-unknown-property': [
      2,
      {
        ignore: ['css'],
      },
    ],
    'import/newline-after-import': [
      2,
      {
        considerComments: true,
      },
    ],
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    // 'import/no-unresolved': 0,
  },
  settings: {
    // 'import/parsers': {
    //   '@typescript-eslint/parser': extensions,
    // },
    // 'import/extensions': extensions,
    'import/resolver': {
      node: {
        extensions,
      },
      alias: {
        map: [
          ['lodash', 'lodash-es'],
          ['@wont/biz-ui', './src'],
          // ['@/', './src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
      },
    },
  },
};
