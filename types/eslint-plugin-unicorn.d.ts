declare module 'eslint-plugin-unicorn' {
  // {@symbiote/notExtraneous @types/eslint}
  import type { Linter } from 'eslint';

  const eslintPlugin: { configs?: Record<string, Linter.Config> };
  export default eslintPlugin;
}
