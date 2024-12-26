declare module 'eslint-plugin-import' {
  // {@symbiote/notExtraneous @types/eslint}
  import type { Linter } from 'eslint';

  export const flatConfigs: Record<string, Linter.Config>;
}
