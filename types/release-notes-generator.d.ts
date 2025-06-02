/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@semantic-release/release-notes-generator' {
  import type { GenerateNotesContext } from 'semantic-release';

  export function generateNotes(
    pluginConfig: { parserOpts: any; writerOpts: any },
    context: GenerateNotesContext
  ): Promise<string>;
}
