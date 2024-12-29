declare module 'eslint-config-turbo/flat' {
  // {@symbiote/notExtraneous @types/eslint}
  import { type Linter } from 'eslint';

  const eslintPlugin: Linter.Config[];
  export default eslintPlugin;
}
