/* eslint-disable unicorn/prevent-abbreviations */
import assert from 'node:assert';

import { type Entries } from 'type-fest';

import {
  commonDebug,
  type GenericPackageJson,
  type Package,
  type ProjectMetadata
} from 'universe+project-utils:analyze/common.ts';

import { ErrorMessage, ProjectError } from 'universe+project-utils:error.ts';

const debug = commonDebug.extend('sortPackagesTopologically');

type PackageGraph = Map<string, PackageGraphNode>;

type PackageGraphNode = {
  package: Package<GenericPackageJson>;
  incomingDependents: PackageGraphNode[];
  outgoingDependencies: PackageGraphNode[];
};

/**
 * Synchronously derive a directed graph representing the project's package
 * dependency topology and return said project's packages in a
 * topologically-ordered array.
 *
 * The returned array is 2-dimensional, with each index containing an array of
 * packages that depend upon those from the previous index. Dependency relations
 * between packages are determined by the presence of a package's name in the
 * `package.json` `dependencies` or `peerDependencies` (or, optionally,
 * `devDependencies`) field of another package.
 *
 * Packages that depend on themselves will have that self-referential dependency
 * ignored. Dependency cycles will cause this function to throw.
 */
export function sortPackagesTopologically(
  projectMetadata: ProjectMetadata<GenericPackageJson>,
  {
    includeDevDependencies = false,
    allowPrivateDependencies = false,
    skipPrivateDependencies = true
  }: {
    /**
     * If `true`, each package's `package.json` `devDependencies` will be
     * included in package dependency calculations.
     *
     * @default false
     */
    includeDevDependencies?: boolean;
    /**
     * If `false`, a package _without_ a `package.json` `private: true` field
     * can never depend upon another package with a `package.json` `private:
     * true` field. If such a relation is encountered, an error will be thrown.
     *
     * @default false
     */
    allowPrivateDependencies?: boolean;
    /**
     * If `true`, packages with a `package.json` `private: true` field will be
     * skipped if no other packages in the repository depend on them.
     *
     * @default true
     */
    skipPrivateDependencies?: boolean;
  } = {}
): Package<GenericPackageJson>[][] {
  debug('includeDevDependencies: %O', includeDevDependencies);
  debug('allowPrivateDependencies: %O', allowPrivateDependencies);
  debug('skipPrivateDependencies: %O', skipPrivateDependencies);

  const { rootPackage, subRootPackages } = projectMetadata;

  // * Construct the D(A)G

  assert(rootPackage.json.name, ErrorMessage.MissingNameInPackageJson(rootPackage.root));

  const packageGraphNodeEntries: Entries<PackageGraph> = [
    [rootPackage.json.name, rootPackage] as const,
    ...(subRootPackages?.entries() || [])
  ].map(([packageName, package_]) => [
    packageName,
    { package: package_, incomingDependents: [], outgoingDependencies: [] }
  ]);

  const packageGraph: PackageGraph = new Map(packageGraphNodeEntries);

  for (const [currentPackageName, node] of packageGraphNodeEntries) {
    const {
      dependencies = {},
      devDependencies = {},
      peerDependencies = {}
    } = node.package.json;

    const dependenciesPackages = new Set(
      Object.keys(dependencies)
        .concat(Object.keys(peerDependencies))
        .concat(includeDevDependencies ? Object.keys(devDependencies) : [])
    )
      .values()
      .toArray()
      .map((packageName) => {
        const dependency = packageGraph.get(packageName);
        const isSelfRef = packageName === currentPackageName;

        if (dependency) {
          if (
            !allowPrivateDependencies &&
            dependency.package.json.private &&
            !node.package.json.private
          ) {
            throw new ProjectError(
              ErrorMessage.IllegalPrivateDependency(currentPackageName, packageName)
            );
          }

          if (!isSelfRef) {
            dependency.incomingDependents.push(node);
          }
        }

        return isSelfRef ? undefined : dependency;
      })
      .filter((node): node is NonNullable<typeof node> => !!node);

    node.outgoingDependencies = dependenciesPackages;
  }

  debug('packageGraph: %O', packageGraph);

  // * Derive the topology (error if any cycles are encountered)
  // ! Note that we're cannibalizing packageGraph after this point

  const topology: Package<GenericPackageJson>[][] = [];

  for (
    let nodeNames = packageGraph.keys().toArray(),
      previousNodeCount = -1,
      nodeCount = nodeNames.length;
    nodeCount !== 0;
    nodeNames = packageGraph.keys().toArray(),
      previousNodeCount = nodeCount,
      nodeCount = nodeNames.length
  ) {
    debug('nodeNames: %O', nodeNames);
    debug('previousNodeCount: %O', previousNodeCount);
    debug('nodeCount: %O', nodeCount);

    const isFirstIteration = previousNodeCount === -1;

    if (previousNodeCount === nodeCount) {
      // ? No nodes were deleted in the last iteration, meaning we've
      // ? encountered a cycle
      throw new ProjectError(ErrorMessage.DependencyCycle(nodeNames));
    }

    const currentTopology = packageGraph
      .entries()
      .toArray()
      .filter(([, { outgoingDependencies }]) => outgoingDependencies.length === 0)
      .map(([deletedPackageName, deletedNode]) => {
        packageGraph.delete(deletedPackageName);

        const numDependents = deletedNode.incomingDependents.length;

        deletedNode.incomingDependents.forEach((dependentNode) => {
          dependentNode.outgoingDependencies = dependentNode.outgoingDependencies.filter(
            (node) => node !== deletedNode
          );
        });

        debug('deleted node %O from package graph: %O', deletedPackageName, deletedNode);

        if (
          isFirstIteration &&
          skipPrivateDependencies &&
          deletedNode.package.json.private &&
          numDependents === 0
        ) {
          debug('dropped node from topology result (reason: skipPrivateDependencies)');
          return undefined;
        } else {
          debug('node will be added to topology result');
          return deletedNode.package;
        }
      })
      .filter((package_) => !!package_);

    if (currentTopology.length) {
      debug('pushed additional topology: %O', currentTopology);
      topology.push(currentTopology);
    }
  }

  debug('topology: %O', topology);
  return topology;
}
