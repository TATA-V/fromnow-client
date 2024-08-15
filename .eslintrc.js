module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  ignorePatterns: ['README.md', '.eslintrc.js', 'tsconfig.json'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'max-len': 'off',
    'object-curly-spacing': ['warn', 'always'],
    'no-alert': 'off',
    'curly': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': ['error',
      {
        printWidth: 150,
        bracketSpacing: true,
        bracketSameLine: true,
      }
    ],
  },
};

