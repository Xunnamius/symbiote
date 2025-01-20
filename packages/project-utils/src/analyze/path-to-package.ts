import {
  type GenericPackageJson,
  type Package,
  type ProjectMetadata
} from 'universe+project-utils:analyze/common.ts';

import { ErrorMessage, ProjectError } from 'universe+project-utils:error.ts';
import { type AbsolutePath } from 'universe+project-utils:fs.ts';

/**
 * Synchronously resolve `path` to the first package that contains that path.
 * If `path` points to a location outside of the project, an error is thrown.
 */
export function pathToPackage<T extends GenericPackageJson>(
  path: AbsolutePath,
  projectMetadata: ProjectMetadata<T>
): Package<T> {
  const { rootPackage, subRootPackages } = projectMetadata;

  if (subRootPackages) {
    const subrootPackage = subRootPackages.all.find(({ root: packageRoot }) => {
      return path.startsWith(packageRoot);
    });

    if (subrootPackage) {
      return subrootPackage;
    }
  }

  if (path.startsWith(rootPackage.root)) {
    return rootPackage;
  }

  throw new ProjectError(ErrorMessage.PathOutsideRoot(path));
}
