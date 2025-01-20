export * from 'universe+project-utils:fs/well-known-constants.ts';
export * from 'universe+project-utils:fs/derive-virtual-gitignore-lines.ts';
export * from 'universe+project-utils:fs/derive-virtual-prettierignore-lines.ts';
export * from 'universe+project-utils:fs/is-accessible.ts';
export * from 'universe+project-utils:fs/read-json.ts';
export * from 'universe+project-utils:fs/read-jsonc.ts';
export * from 'universe+project-utils:fs/read-xpackage-json-at-root.ts';

export {
  getCurrentWorkingDirectory,
  getInitialWorkingDirectory,
  isAbsolutePath,
  isRelativePath,
  toAbsolutePath,
  toDirname,
  toPath,
  toRelativePath,
  type AbsolutePath,
  type Path,
  type RelativePath
} from 'universe+project-utils:fs/common.ts';
