import js from '@eslint/js';
import eslintStyle from '@stylistic/eslint-plugin-ts';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import playwrightPlugin from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ignores: ['**/node_modules', '**/cdk.out', '**/*.d.ts', '**/.vitepress/dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...jestPlugin.configs['flat/recommended'],
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      '@stylistic': eslintStyle,
      jest: jestPlugin,
    },
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      parser: tsEslint.parser,
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'eol-last': 'warn',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'no-async-promise-executor': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          projects: ['packages/*/tsconfig.json', '*/tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['**/*.{test,spec}.ts'],
    plugins: {
      jest: jestPlugin,
    },
  },
  {
    files: ['**/playwright/**/*.ts'],
    extends: [playwrightPlugin.configs['flat/recommended']],
    rules: {
      'playwright/no-standalone-expect': 'off',
    },
  },
  eslintPluginPrettierRecommended,
);
