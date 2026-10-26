import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  eslintConfigPrettier,
  {
    ignores: ['**/dist', '**/out-tsc', '**/coverage', '**/.angular'],
  },
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: eslintPluginPrettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-duplicate-imports': 'warn',
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true, ignoreMemberSort: false }],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
      ],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:feature', 'type:layout', 'type:ui', 'type:data'],
            },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:ui', 'type:data'] },
            { sourceTag: 'type:layout', onlyDependOnLibsWithTags: ['type:ui', 'type:data'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui'] },
            { sourceTag: 'type:data', onlyDependOnLibsWithTags: ['type:data'] },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off',
    },
  },
];
