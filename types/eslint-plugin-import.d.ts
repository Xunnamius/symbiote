declare module 'eslint-plugin-import' {
  // {@symbiote/notExtraneous @types/eslint}
  import type { Linter } from 'eslint';

  const eslintPlugin: { flatConfigs: Record<string, Linter.Config> };
  export default eslintPlugin;
}
