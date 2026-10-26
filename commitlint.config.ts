import type { UserConfig } from '@commitlint/types';

const commitlint: UserConfig = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'header-max-length': [1, 'always', 80],
  },
};

module.exports = commitlint;
