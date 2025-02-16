import nextjs from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

export default [
  {
    plugins: {
      '@next/next': nextjs,
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/alt-text': 'off',
      '@next/next/no-img-element': 'off'
    }
  }
];