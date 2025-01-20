export * from 'universe+project-utils:analyze/analyze-project-structure.ts';
export * from 'universe+project-utils:analyze/gather-project-files.ts';
export * from 'universe+project-utils:analyze/gather-package-files.ts';
export * from 'universe+project-utils:analyze/gather-package-build-targets.ts';
export * from 'universe+project-utils:analyze/gather-import-entries-from-files.ts';
export * from 'universe+project-utils:analyze/gather-pseudodecorator-entries-from-files.ts';
export * from 'universe+project-utils:analyze/generate-package-json-engine-maintained-node-versions.ts';
export * from 'universe+project-utils:analyze/package-root-to-id.ts';
export * from 'universe+project-utils:analyze/path-to-package.ts';
export * from 'universe+project-utils:analyze/sort-packages-topologically.ts';

export {
  isPackage,
  isProjectMetadata,
  isRootPackage,
  isWorkspacePackage,
  isXPackageJson,
  ProjectAttribute,
  WorkspaceAttribute,
  type MonorepoMetadata,
  type Package,
  type PackageBuildTargets as PackageBuildTargets,
  type PackageFiles,
  type PolyrepoMetadata,
  type ProjectFiles,
  type ProjectMetadata,
  type RootPackage,
  type WorkspacePackage,
  type WorkspacePackageId,
  type WorkspacePackageName,
  type XPackageJson,
  type XPackageJsonHybridrepoRoot,
  type XPackageJsonMonorepoRoot,
  type XPackageJsonPolyrepoRoot,
  type XPackageJsonScripts,
  type XPackageJsonSubRoot
} from 'universe+project-utils:analyze/common.ts';
