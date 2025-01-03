/* eslint-disable unicorn/escape-case */
/* eslint-disable unicorn/no-hex-escape */
import { type RelativePath } from 'multiverse+project-utils:fs.ts';

import {
  deriveAliasesForBabel,
  deriveAliasesForEslint,
  deriveAliasesForJest,
  deriveAliasesForNextJs,
  deriveAliasesForTypeScript,
  deriveAliasesForWebpack,
  ensureRawSpecifierOk,
  generateRawAliasMap,
  makeRawAliasMapping,
  mapRawSpecifierToPath,
  mapRawSpecifierToRawAliasMapping,
  rawAliasToRegExp,
  WellKnownImportAlias,
  type RawAlias,
  type RawAliasMapping,
  type RawPath
} from 'rootverse+project-utils:src/alias.ts';

import { ErrorMessage } from 'rootverse+project-utils:src/error.ts';

import type { ProjectMetadata } from 'rootverse+project-utils:src/index.ts';

const mockProjectRoot = '/path/to/root';

const mockPolyrepoMappings = [
  [
    {
      alias: 'rootverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Rootverse,
      packageId: undefined
    },
    { path: '' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'universe',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Universe,
      packageId: undefined
    },
    { path: 'src' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'universe',
      prefix: 'exact',
      suffix: 'exact',
      group: WellKnownImportAlias.Universe,
      packageId: undefined
    },
    {
      path: 'src/index' as RelativePath,
      prefix: 'root',
      suffix: 'none',
      extensionless: false
    }
  ],
  [
    {
      alias: 'testverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Testverse,
      packageId: undefined
    },
    { path: 'test' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'typeverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Typeverse,
      packageId: undefined
    },
    {
      path: 'types' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ]
] satisfies [Omit<RawAlias, 'regExp'>, RawPath][] as RawAliasMapping[];

const mockHybridrepoMappings = [
  [
    {
      alias: 'multiverse+pkg-1',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-1'
    },
    {
      path: 'path/to/packages/pkg-1/src' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'multiverse+pkg-2',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-2'
    },
    {
      path: 'path/to/packages/pkg-2/src' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'multiverse+pkg-10',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-10'
    },
    {
      path: 'path/to/packages/pkg-10/src' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'multiverse+pkg-1',
      prefix: 'exact',
      suffix: 'exact',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-1'
    },
    {
      path: 'path/to/packages/pkg-1/src/index' as RelativePath,
      prefix: 'root',
      suffix: 'none',
      extensionless: false
    }
  ],
  [
    {
      alias: 'multiverse+pkg-2',
      prefix: 'exact',
      suffix: 'exact',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-2'
    },
    {
      path: 'path/to/packages/pkg-2/src/index' as RelativePath,
      prefix: 'root',
      suffix: 'none',
      extensionless: false
    }
  ],
  [
    {
      alias: 'multiverse+pkg-10',
      prefix: 'exact',
      suffix: 'exact',
      group: WellKnownImportAlias.Multiverse,
      packageId: 'pkg-10'
    },
    {
      path: 'path/to/packages/pkg-10/src/index' as RelativePath,
      prefix: 'root',
      suffix: 'none',
      extensionless: false
    }
  ],
  [
    {
      alias: 'rootverse+pkg-1',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Rootverse,
      packageId: 'pkg-1'
    },
    {
      path: 'path/to/packages/pkg-1' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'rootverse+pkg-2',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Rootverse,
      packageId: 'pkg-2'
    },
    {
      path: 'path/to/packages/pkg-2' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'rootverse+pkg-10',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Rootverse,
      packageId: 'pkg-10'
    },
    {
      path: 'path/to/packages/pkg-10' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'rootverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Rootverse,
      packageId: undefined
    },
    { path: '' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'universe',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Universe,
      packageId: undefined
    },
    { path: 'src' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'universe',
      prefix: 'exact',
      suffix: 'exact',
      group: WellKnownImportAlias.Universe,
      packageId: undefined
    },
    {
      path: 'src/index' as RelativePath,
      prefix: 'root',
      suffix: 'none',
      extensionless: false
    }
  ],
  [
    {
      alias: 'testverse+pkg-1',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Testverse,
      packageId: 'pkg-1'
    },
    {
      path: 'path/to/packages/pkg-1/test' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'testverse+pkg-2',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Testverse,
      packageId: 'pkg-2'
    },
    {
      path: 'path/to/packages/pkg-2/test' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'testverse+pkg-10',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Testverse,
      packageId: 'pkg-10'
    },
    {
      path: 'path/to/packages/pkg-10/test' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ],
  [
    {
      alias: 'testverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Testverse,
      packageId: undefined
    },
    { path: 'test' as RelativePath, prefix: 'root', suffix: 'open', extensionless: true }
  ],
  [
    {
      alias: 'typeverse',
      prefix: 'exact',
      suffix: 'open',
      group: WellKnownImportAlias.Typeverse,
      packageId: undefined
    },
    {
      path: 'types' as RelativePath,
      prefix: 'root',
      suffix: 'open',
      extensionless: true
    }
  ]
] satisfies [Omit<RawAlias, 'regExp'>, RawPath][] as RawAliasMapping[];

beforeAll(() => {
  mockPolyrepoMappings.forEach(([rawAlias]) => {
    rawAlias.regExp = rawAliasToRegExp(rawAlias);
  });

  mockHybridrepoMappings.forEach(([rawAlias]) => {
    rawAlias.regExp = rawAliasToRegExp(rawAlias);
  });
});

describe('::makeRawAliasMapping', () => {
  it('constructs aliases as expected from minimal args', async () => {
    expect.hasAssertions();

    expect(
      makeRawAliasMapping(
        { alias: 'alias-1', group: WellKnownImportAlias.Universe, packageId: undefined },
        { path: 'the/path/for/alias-1' as RelativePath }
      )
    ).toStrictEqual([
      {
        alias: 'alias-1',
        prefix: 'exact',
        suffix: 'open',
        group: WellKnownImportAlias.Universe,
        regExp: /^alias\x2d1:(.+)$/,
        packageId: undefined
      },
      {
        path: 'the/path/for/alias-1' as RelativePath,
        prefix: 'root',
        suffix: 'open',
        extensionless: true
      }
    ]);
  });

  it('constructs aliases as expected from given args', async () => {
    expect.hasAssertions();

    expect(
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          prefix: 'none',
          suffix: 'none',
          group: WellKnownImportAlias.Multiverse,
          packageId: undefined
        },
        {
          path: 'the/path/for/alias-1' as RelativePath,
          suffix: 'none',
          extensionless: false
        }
      )
    ).toStrictEqual([
      {
        alias: 'alias-1',
        prefix: 'none',
        suffix: 'none',
        group: WellKnownImportAlias.Multiverse,
        regExp: /alias\x2d1/,
        packageId: undefined
      },
      {
        path: 'the/path/for/alias-1' as RelativePath,
        prefix: 'root',
        suffix: 'none',
        extensionless: false
      }
    ]);
  });

  it('does not throw if alias suffix is "open" and path suffix is not "open"', async () => {
    expect.hasAssertions();

    expect(
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath, suffix: 'none' }
      )
    ).toStrictEqual([
      {
        alias: 'alias-1',
        prefix: 'exact',
        suffix: 'open',
        group: WellKnownImportAlias.Testverse,
        regExp: /^alias\x2d1:(.+)$/,
        packageId: undefined
      },
      {
        path: 'the/path/for/alias-1' as RelativePath,
        prefix: 'root',
        suffix: 'none',
        extensionless: true
      }
    ]);
  });

  it('throws if path suffix is "open" and alias suffix is not "open"', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          suffix: 'none',
          group: WellKnownImportAlias.Typeverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath, suffix: 'open' }
      )
    ).toThrow(ErrorMessage.IllegalAliasBadSuffix('alias-1'));
  });

  it('throws if alias contains path separator characters', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'bad/alias',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasKeyInvalidCharacters('bad/alias', '').split(':')[0]
    );

    expect(() =>
      makeRawAliasMapping(
        {
          alias: String.raw`bad\alias`,
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasKeyInvalidCharacters(String.raw`bad\alias`, '').split(
        ':'
      )[0]
    );

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'bad-alias/',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasKeyInvalidCharacters('bad-alias/', '').split(':')[0]
    );
  });

  it('throws if alias contains the "$" character', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        {
          alias: '$alias-1',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasKeyInvalidCharacters('$alias-1', '').split(':')[0]
    );
  });

  it('throws if path contains the ":" character', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path:for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidCharacters(
        'alias-1',
        'the/path:for/alias-1',
        ''
      ).split(':')[0]
    );
  });

  it('throws if path start or end with the "/" character', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: '/the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix(
        'alias-1',
        '/the/path/for/alias-1'
      ).split(':')[0]
    );

    expect(() =>
      makeRawAliasMapping(
        {
          alias: 'alias-1',
          group: WellKnownImportAlias.Rootverse,
          packageId: undefined
        },
        { path: 'the/path/for/alias-1/' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix(
        'alias-1',
        'the/path/for/alias-1/'
      ).split(':')[0]
    );
  });

  it('throws if path is explicitly relative (not resembling a bare specifier)', async () => {
    expect.hasAssertions();

    expect(() =>
      makeRawAliasMapping(
        { alias: 'alias-1', group: WellKnownImportAlias.Universe, packageId: undefined },
        { path: './the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix(
        'alias-1',
        './the/path/for/alias-1'
      ).split(':')[0]
    );

    expect(() =>
      makeRawAliasMapping(
        { alias: 'alias-1', group: WellKnownImportAlias.Universe, packageId: undefined },
        { path: '../the/path/for/alias-1' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix(
        'alias-1',
        '../the/path/for/alias-1'
      ).split(':')[0]
    );

    expect(() =>
      makeRawAliasMapping(
        { alias: 'alias-1', group: WellKnownImportAlias.Universe, packageId: undefined },
        { path: '.' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix('alias-1', '.').split(':')[0]
    );

    expect(() =>
      makeRawAliasMapping(
        { alias: 'alias-1', group: WellKnownImportAlias.Universe, packageId: undefined },
        { path: '..' as RelativePath }
      )
    ).toThrow(
      ErrorMessage.IllegalAliasValueInvalidSeparatorAdfix('alias-1', '..').split(':')[0]
    );
  });
});

describe('::generateRawAliasMap', () => {
  it('translates polyrepo metadata into a raw alias map', async () => {
    expect.hasAssertions();

    expect(
      generateRawAliasMap({
        rootPackage: { root: mockProjectRoot },
        subRootPackages: undefined
      } as ProjectMetadata)
    ).toStrictEqual(mockPolyrepoMappings);
  });

  it('translates monorepo metadata into a raw alias map ordered by reverse-specificity', async () => {
    expect.hasAssertions();

    expect(
      generateRawAliasMap({
        rootPackage: { root: mockProjectRoot },
        subRootPackages: {
          all: [
            {
              id: 'pkg-1',
              json: {},
              root: '/path/to/root/path/to/packages/pkg-1',
              relativeRoot: 'path/to/packages/pkg-1'
            },
            {
              id: 'pkg-2',
              json: {},
              root: '/path/to/root/path/to/packages/pkg-2',
              relativeRoot: 'path/to/packages/pkg-2'
            },
            {
              id: 'pkg-10',
              json: {},
              root: '/path/to/root/path/to/packages/pkg-10',
              relativeRoot: 'path/to/packages/pkg-10'
            }
          ]
        }
      } as ProjectMetadata)
    ).toStrictEqual(mockHybridrepoMappings);
  });

  it('natural-sorts monorepo metadata by package-id', async () => {
    expect.hasAssertions();

    expect(
      generateRawAliasMap({
        rootPackage: { root: mockProjectRoot },
        subRootPackages: {
          all: [
            {
              id: 'a',
              json: {},
              root: '/path/to/root/packages/a',
              relativeRoot: 'packages/a'
            },
            {
              id: 'aa',
              json: {},
              root: '/path/to/root/packages/aa',
              relativeRoot: 'packages/aa'
            },
            {
              id: 'a2',
              json: {},
              root: '/path/to/root/packages/a2',
              relativeRoot: 'packages/a2'
            },
            {
              id: 'b2',
              json: {},
              root: '/path/to/root/packages/b2',
              relativeRoot: 'packages/b2'
            },
            {
              id: 'a1',
              json: {},
              root: '/path/to/root/packages/a1',
              relativeRoot: 'packages/a1'
            }
          ]
        }
      } as ProjectMetadata)
    ).toStrictEqual([
      [
        {
          alias: 'multiverse+a',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a:(.+)$/,
          packageId: 'a'
        },
        { path: 'packages/a/src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'multiverse+a1',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a1:(.+)$/,
          packageId: 'a1'
        },
        { path: 'packages/a1/src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'multiverse+a2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a2:(.+)$/,
          packageId: 'a2'
        },
        { path: 'packages/a2/src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'multiverse+aa',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+aa:(.+)$/,
          packageId: 'aa'
        },
        { path: 'packages/aa/src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'multiverse+b2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+b2:(.+)$/,
          packageId: 'b2'
        },
        { path: 'packages/b2/src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'multiverse+a',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a$/,
          packageId: 'a'
        },
        {
          path: 'packages/a/src/index',
          prefix: 'root',
          suffix: 'none',
          extensionless: false
        }
      ],
      [
        {
          alias: 'multiverse+a1',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a1$/,
          packageId: 'a1'
        },
        {
          path: 'packages/a1/src/index',
          prefix: 'root',
          suffix: 'none',
          extensionless: false
        }
      ],
      [
        {
          alias: 'multiverse+a2',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+a2$/,
          packageId: 'a2'
        },
        {
          path: 'packages/a2/src/index',
          prefix: 'root',
          suffix: 'none',
          extensionless: false
        }
      ],
      [
        {
          alias: 'multiverse+aa',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+aa$/,
          packageId: 'aa'
        },
        {
          path: 'packages/aa/src/index',
          prefix: 'root',
          suffix: 'none',
          extensionless: false
        }
      ],
      [
        {
          alias: 'multiverse+b2',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Multiverse,
          regExp: /^multiverse\+b2$/,
          packageId: 'b2'
        },
        {
          path: 'packages/b2/src/index',
          prefix: 'root',
          suffix: 'none',
          extensionless: false
        }
      ],
      [
        {
          alias: 'rootverse+a',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse\+a:(.+)$/,
          packageId: 'a'
        },
        { path: 'packages/a', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'rootverse+a1',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse\+a1:(.+)$/,
          packageId: 'a1'
        },
        { path: 'packages/a1', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'rootverse+a2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse\+a2:(.+)$/,
          packageId: 'a2'
        },
        { path: 'packages/a2', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'rootverse+aa',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse\+aa:(.+)$/,
          packageId: 'aa'
        },
        { path: 'packages/aa', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'rootverse+b2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse\+b2:(.+)$/,
          packageId: 'b2'
        },
        { path: 'packages/b2', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'rootverse',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Rootverse,
          regExp: /^rootverse:(.+)$/,
          packageId: undefined
        },
        { path: '', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'universe',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Universe,
          regExp: /^universe:(.+)$/,
          packageId: undefined
        },
        { path: 'src', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'universe',
          prefix: 'exact',
          suffix: 'exact',
          group: WellKnownImportAlias.Universe,
          regExp: /^universe$/,
          packageId: undefined
        },
        { path: 'src/index', prefix: 'root', suffix: 'none', extensionless: false }
      ],
      [
        {
          alias: 'testverse+a',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse\+a:(.+)$/,
          packageId: 'a'
        },
        { path: 'packages/a/test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'testverse+a1',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse\+a1:(.+)$/,
          packageId: 'a1'
        },
        { path: 'packages/a1/test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'testverse+a2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse\+a2:(.+)$/,
          packageId: 'a2'
        },
        { path: 'packages/a2/test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'testverse+aa',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse\+aa:(.+)$/,
          packageId: 'aa'
        },
        { path: 'packages/aa/test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'testverse+b2',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse\+b2:(.+)$/,
          packageId: 'b2'
        },
        { path: 'packages/b2/test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'testverse',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Testverse,
          regExp: /^testverse:(.+)$/,
          packageId: undefined
        },
        { path: 'test', prefix: 'root', suffix: 'open', extensionless: true }
      ],
      [
        {
          alias: 'typeverse',
          prefix: 'exact',
          suffix: 'open',
          group: WellKnownImportAlias.Typeverse,
          regExp: /^typeverse:(.+)$/,
          packageId: undefined
        },
        { path: 'types', prefix: 'root', suffix: 'open', extensionless: true }
      ]
    ]);
  });
});

describe('::deriveAliasesForBabel', () => {
  it('returns expected aliases', async () => {
    expect.hasAssertions();

    expect(deriveAliasesForBabel(mockHybridrepoMappings)).toStrictEqual({
      '^multiverse\\+pkg\\x2d1:(.+)$': './path/to/packages/pkg-1/src/$1',
      '^multiverse\\+pkg\\x2d2:(.+)$': './path/to/packages/pkg-2/src/$1',
      '^multiverse\\+pkg\\x2d10:(.+)$': './path/to/packages/pkg-10/src/$1',
      '^multiverse\\+pkg\\x2d1$': './path/to/packages/pkg-1/src/index.js',
      '^multiverse\\+pkg\\x2d2$': './path/to/packages/pkg-2/src/index.js',
      '^multiverse\\+pkg\\x2d10$': './path/to/packages/pkg-10/src/index.js',
      '^rootverse\\+pkg\\x2d1:(.+)$': './path/to/packages/pkg-1/$1',
      '^rootverse\\+pkg\\x2d2:(.+)$': './path/to/packages/pkg-2/$1',
      '^rootverse\\+pkg\\x2d10:(.+)$': './path/to/packages/pkg-10/$1',
      '^rootverse:(.+)$': './$1',
      '^universe:(.+)$': './src/$1',
      '^universe$': './src/index.js',
      '^testverse\\+pkg\\x2d1:(.+)$': './path/to/packages/pkg-1/test/$1',
      '^testverse\\+pkg\\x2d2:(.+)$': './path/to/packages/pkg-2/test/$1',
      '^testverse\\+pkg\\x2d10:(.+)$': './path/to/packages/pkg-10/test/$1',
      '^testverse:(.+)$': './test/$1',
      '^typeverse:(.+)$': './types/$1'
    });
  });
});

describe('::deriveAliasesForEslint', () => {
  it('returns expected aliases in expected order', async () => {
    expect.hasAssertions();

    expect(deriveAliasesForEslint(mockHybridrepoMappings)).toStrictEqual([
      ['multiverse+pkg-1:*', './path/to/packages/pkg-1/src/*'],
      ['multiverse+pkg-2:*', './path/to/packages/pkg-2/src/*'],
      ['multiverse+pkg-10:*', './path/to/packages/pkg-10/src/*'],
      ['multiverse+pkg-1', './path/to/packages/pkg-1/src/index.ts'],
      ['multiverse+pkg-2', './path/to/packages/pkg-2/src/index.ts'],
      ['multiverse+pkg-10', './path/to/packages/pkg-10/src/index.ts'],
      ['rootverse+pkg-1:*', './path/to/packages/pkg-1/*'],
      ['rootverse+pkg-2:*', './path/to/packages/pkg-2/*'],
      ['rootverse+pkg-10:*', './path/to/packages/pkg-10/*'],
      // ! It's important aliases like this come AFTER more specific versions
      ['rootverse:*', './*'],
      ['universe:*', './src/*'],
      // ! It's important aliases like this come AFTER the open-ended version
      ['universe', './src/index.ts'],
      ['testverse+pkg-1:*', './path/to/packages/pkg-1/test/*'],
      ['testverse+pkg-2:*', './path/to/packages/pkg-2/test/*'],
      ['testverse+pkg-10:*', './path/to/packages/pkg-10/test/*'],
      // ! It's important aliases like this come AFTER more specific versions
      ['testverse:*', './test/*'],
      ['typeverse:*', './types/*']
    ]);
  });
});

describe('::deriveAliasesForWebpack', () => {
  it('returns expected aliases', async () => {
    expect.hasAssertions();

    expect(
      deriveAliasesForWebpack(mockHybridrepoMappings, mockProjectRoot)
    ).toStrictEqual({
      'multiverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/src/`,
      'multiverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/src/`,
      'multiverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/src/`,
      'multiverse+pkg-1': `${mockProjectRoot}/path/to/packages/pkg-1/src/index.ts`,
      'multiverse+pkg-2': `${mockProjectRoot}/path/to/packages/pkg-2/src/index.ts`,
      'multiverse+pkg-10': `${mockProjectRoot}/path/to/packages/pkg-10/src/index.ts`,
      'rootverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/`,
      'rootverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/`,
      'rootverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/`,
      'rootverse:': `${mockProjectRoot}/`,
      'universe:': `${mockProjectRoot}/src/`,
      universe: `${mockProjectRoot}/src/index.ts`,
      'testverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/test/`,
      'testverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/test/`,
      'testverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/test/`,
      'testverse:': `${mockProjectRoot}/test/`,
      'typeverse:': `${mockProjectRoot}/types/`
    });
  });
});

describe('::deriveAliasesForNextJs', () => {
  it('returns expected aliases', async () => {
    expect.hasAssertions();

    expect(
      deriveAliasesForNextJs(mockHybridrepoMappings, mockProjectRoot)
    ).toStrictEqual({
      'multiverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/src/`,
      'multiverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/src/`,
      'multiverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/src/`,
      'multiverse+pkg-1': `${mockProjectRoot}/path/to/packages/pkg-1/src/index.ts`,
      'multiverse+pkg-2': `${mockProjectRoot}/path/to/packages/pkg-2/src/index.ts`,
      'multiverse+pkg-10': `${mockProjectRoot}/path/to/packages/pkg-10/src/index.ts`,
      'rootverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/`,
      'rootverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/`,
      'rootverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/`,
      'rootverse:': `${mockProjectRoot}/`,
      'universe:': `${mockProjectRoot}/src/`,
      universe: `${mockProjectRoot}/src/index.ts`,
      'testverse+pkg-1:': `${mockProjectRoot}/path/to/packages/pkg-1/test/`,
      'testverse+pkg-2:': `${mockProjectRoot}/path/to/packages/pkg-2/test/`,
      'testverse+pkg-10:': `${mockProjectRoot}/path/to/packages/pkg-10/test/`,
      'testverse:': `${mockProjectRoot}/test/`,
      'typeverse:': `${mockProjectRoot}/types/`
    });
  });
});

describe('::deriveAliasesForJest', () => {
  it('returns expected aliases', async () => {
    expect.hasAssertions();

    expect(deriveAliasesForJest(mockHybridrepoMappings)).toStrictEqual({
      '^multiverse\\+pkg\\x2d1:(.+)$': '<rootDir>/path/to/packages/pkg-1/src/$1',
      '^multiverse\\+pkg\\x2d2:(.+)$': '<rootDir>/path/to/packages/pkg-2/src/$1',
      '^multiverse\\+pkg\\x2d10:(.+)$': '<rootDir>/path/to/packages/pkg-10/src/$1',
      '^multiverse\\+pkg\\x2d1$': '<rootDir>/path/to/packages/pkg-1/src/index.ts',
      '^multiverse\\+pkg\\x2d2$': '<rootDir>/path/to/packages/pkg-2/src/index.ts',
      '^multiverse\\+pkg\\x2d10$': '<rootDir>/path/to/packages/pkg-10/src/index.ts',
      '^rootverse\\+pkg\\x2d1:(.+)$': '<rootDir>/path/to/packages/pkg-1/$1',
      '^rootverse\\+pkg\\x2d2:(.+)$': '<rootDir>/path/to/packages/pkg-2/$1',
      '^rootverse\\+pkg\\x2d10:(.+)$': '<rootDir>/path/to/packages/pkg-10/$1',
      '^rootverse:(.+)$': '<rootDir>/$1',
      '^universe:(.+)$': '<rootDir>/src/$1',
      '^universe$': '<rootDir>/src/index.ts',
      '^testverse\\+pkg\\x2d1:(.+)$': '<rootDir>/path/to/packages/pkg-1/test/$1',
      '^testverse\\+pkg\\x2d2:(.+)$': '<rootDir>/path/to/packages/pkg-2/test/$1',
      '^testverse\\+pkg\\x2d10:(.+)$': '<rootDir>/path/to/packages/pkg-10/test/$1',
      '^testverse:(.+)$': '<rootDir>/test/$1',
      '^typeverse:(.+)$': '<rootDir>/types/$1'
    });
  });
});

describe('::deriveAliasesForTypeScript', () => {
  it('returns expected aliases', async () => {
    expect.hasAssertions();

    expect(deriveAliasesForTypeScript(mockHybridrepoMappings)).toStrictEqual({
      'multiverse+pkg-1:*': ['path/to/packages/pkg-1/src/*'],
      'multiverse+pkg-2:*': ['path/to/packages/pkg-2/src/*'],
      'multiverse+pkg-10:*': ['path/to/packages/pkg-10/src/*'],
      'multiverse+pkg-1': ['path/to/packages/pkg-1/src/index.ts'],
      'multiverse+pkg-2': ['path/to/packages/pkg-2/src/index.ts'],
      'multiverse+pkg-10': ['path/to/packages/pkg-10/src/index.ts'],
      'rootverse+pkg-1:*': ['path/to/packages/pkg-1/*'],
      'rootverse+pkg-2:*': ['path/to/packages/pkg-2/*'],
      'rootverse+pkg-10:*': ['path/to/packages/pkg-10/*'],
      'rootverse:*': ['*'],
      'universe:*': ['src/*'],
      universe: ['src/index.ts'],
      'testverse+pkg-1:*': ['path/to/packages/pkg-1/test/*'],
      'testverse+pkg-2:*': ['path/to/packages/pkg-2/test/*'],
      'testverse+pkg-10:*': ['path/to/packages/pkg-10/test/*'],
      'testverse:*': ['test/*'],
      'typeverse:*': ['types/*']
    });
  });
});

describe('::mapRawSpecifierToRawAliasMapping', () => {
  it('returns undefined if specifier matches no aliases', async () => {
    expect.hasAssertions();

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'testverse')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'multiverse')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'multiverse+a')
    ).toBeUndefined();
  });

  it('returns matching raw aliases wrt verse-specificity order given a polyrepo specifier', async () => {
    expect.hasAssertions();

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'universe')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias === 'universe' && suffix === 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'universe:something.ts')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias === 'universe' && suffix !== 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'rootverse:something.ts')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias === 'rootverse' && suffix !== 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'testverse:something.ts')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias === 'testverse' && suffix !== 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockPolyrepoMappings, 'typeverse:global.ts')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias === 'typeverse' && suffix !== 'exact'
      )
    );
  });

  it('returns matching raw alias wrt verse-specificity order given a hybridrepo specifier', async () => {
    expect.hasAssertions();

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'universe')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias.startsWith('universe') && suffix === 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'universe:something.ts')
    ).toStrictEqual(
      mockPolyrepoMappings.find(
        ([{ alias, suffix }]) => alias.startsWith('universe') && suffix !== 'exact'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'multiverse')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'multiverse+pkg-2')
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('multiverse') && suffix === 'exact' && packageId === 'pkg-2'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(
        mockHybridrepoMappings,
        'multiverse+pkg-2:something/else/over/there.ts'
      )
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('multiverse') && suffix !== 'exact' && packageId === 'pkg-2'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'multiverse+pkg-1')
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('multiverse') && suffix === 'exact' && packageId === 'pkg-1'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(
        mockHybridrepoMappings,
        'rootverse+pkg-1:stuff.ts'
      )
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('rootverse') && suffix !== 'exact' && packageId === 'pkg-1'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(
        mockHybridrepoMappings,
        'rootverse+pkg-2:my/stuff.ts'
      )
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('rootverse') && suffix !== 'exact' && packageId === 'pkg-2'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'rootverse')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(
        mockHybridrepoMappings,
        'rootverse:stuff/lives/here.ts'
      )
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('rootverse') && suffix !== 'exact' && !packageId
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'testverse')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'testverse+pkg-5')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'testverse+pkg-2')
    ).toBeUndefined();

    expect(
      mapRawSpecifierToRawAliasMapping(
        mockHybridrepoMappings,
        'testverse+pkg-2:something.ts'
      )
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('testverse') && suffix !== 'exact' && packageId === 'pkg-2'
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'testverse:setup.ts')
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix, packageId }]) =>
          alias.startsWith('testverse') && suffix !== 'exact' && !packageId
      )
    );

    expect(
      mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'typeverse:global.ts')
    ).toStrictEqual(
      mockHybridrepoMappings.find(
        ([{ alias, suffix }]) => alias.startsWith('typeverse') && suffix !== 'exact'
      )
    );
  });
});

describe('::mapRawSpecifierToPath', () => {
  it('returns undefined if specifier matches no aliases', async () => {
    expect.hasAssertions();

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, '@babel/core')).toBeUndefined();
    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'testverse')).toBeUndefined();

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'testverse+pkg-1')
    ).toBeUndefined();

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'rootverse')).toBeUndefined();
    expect(mapRawSpecifierToPath(mockHybridrepoMappings, '')).toBeUndefined();

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'typeverse+pkg-1:setup.ts')
    ).toBeUndefined();
  });

  it('maps a raw alias to its theoretical relative filesystem path', async () => {
    expect.hasAssertions();

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'universe:something.ts')).toBe(
      'src/something.ts'
    );

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'multiverse+pkg-1:something.ts')
    ).toBe('path/to/packages/pkg-1/src/something.ts');

    expect(
      mapRawSpecifierToPath(
        mockHybridrepoMappings,
        'multiverse+pkg-2:some/other/thing.ts'
      )
    ).toBe('path/to/packages/pkg-2/src/some/other/thing.ts');

    expect(
      mapRawSpecifierToPath(
        mockHybridrepoMappings,
        'rootverse+pkg-2:some/other/thing.ts'
      )
    ).toBe('path/to/packages/pkg-2/some/other/thing.ts');

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'rootverse:package.json')).toBe(
      'package.json'
    );

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'rootverse:some/thing/is/here.ts')
    ).toBe('some/thing/is/here.ts');

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'testverse:setup.ts')).toBe(
      'test/setup.ts'
    );

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'testverse+pkg-1:setup.ts')
    ).toBe('path/to/packages/pkg-1/test/setup.ts');

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'typeverse:global.ts')).toBe(
      'types/global.ts'
    );
  });

  it('appends extension to the end of path when extensionless is false', async () => {
    expect.hasAssertions();

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'universe')).toBe(
      'src/index.ts'
    );

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'multiverse+pkg-1')).toBe(
      'path/to/packages/pkg-1/src/index.ts'
    );

    expect(
      mapRawSpecifierToPath(mockHybridrepoMappings, 'multiverse+pkg-1', {
        extensionToAppend: '.new'
      })
    ).toBe('path/to/packages/pkg-1/src/index.new');
  });

  it('accepts a single raw specifier instead of an array of them', async () => {
    expect.hasAssertions();

    expect(mapRawSpecifierToPath(mockHybridrepoMappings, 'universe')).toStrictEqual(
      mapRawSpecifierToPath(
        mapRawSpecifierToRawAliasMapping(mockHybridrepoMappings, 'universe')!,
        'universe'
      )
    );
  });
});

describe('::ensureRawSpecifierOk', () => {
  it('does not throw on valid specifiers', async () => {
    expect.hasAssertions();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '@babel/core')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'next-test-api-route-handler')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '@-xun/project-utils/resolver')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'node:path')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(
        mockHybridrepoMappings,
        'https://some-website.com/some/package'
      )
    ).not.toThrow();
  });

  it('accepts a single raw specifier instead of an array of them', async () => {
    expect.hasAssertions();

    const rawAlias: RawAlias = {
      alias: 'fake',
      group: WellKnownImportAlias.Typeverse,
      packageId: undefined,
      prefix: 'exact',
      suffix: 'open',
      regExp: /fake/
    };

    const testSpecifier1 = 'typeverse:global.ts';
    const testSpecifier2 = 'fake:no/ext';
    const fakeMapping: RawAliasMapping = [rawAlias, {} as RawPath];

    const typeverseMapping = mapRawSpecifierToRawAliasMapping(
      mockHybridrepoMappings,
      testSpecifier1
    )!;

    expect(() => ensureRawSpecifierOk(typeverseMapping, testSpecifier1)).not.toThrow();
    expect(() => ensureRawSpecifierOk(fakeMapping, testSpecifier1)).not.toThrow();
    expect(() => ensureRawSpecifierOk(typeverseMapping, testSpecifier2)).not.toThrow();

    expect(() => ensureRawSpecifierOk(fakeMapping, testSpecifier2)).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension(testSpecifier2)
    );

    expect(() => ensureRawSpecifierOk(typeverseMapping, 'typeverse:global')).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension('typeverse:global')
    );
  });

  it('throws if specifier is empty (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, '')).toThrow(
      ErrorMessage.SpecifierNotOkEmpty('')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '', { path: '/in/some/file.abc' })
    ).toThrow(ErrorMessage.SpecifierNotOkEmpty('', '/in/some/file.abc'));
  });

  it('throws if specifier begins with "./" or "../" or "/" or equals "." or ".." (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, '.')).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('.')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '.', { path: '/in/some/file.abc' })
    ).toThrow(ErrorMessage.SpecifierNotOkRelativeNotRootverse('.', '/in/some/file.abc'));

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, '..')).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('..')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '..', { path: '/in/some/file.abc' })
    ).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('..', '/in/some/file.abc')
    );

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, './something.js')).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('./something.js')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, './something.js', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse(
        './something.js',
        '/in/some/file.abc'
      )
    );

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, '../up.ts')).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('../up.ts')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '../up.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse('../up.ts', '/in/some/file.abc')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '/bad-bad/not/good.ts')
    ).toThrow(ErrorMessage.SpecifierNotOkRelativeNotRootverse('/bad-bad/not/good.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, '/bad-bad/not/good.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkRelativeNotRootverse(
        '/bad-bad/not/good.ts',
        '/in/some/file.abc'
      )
    );
  });

  it('throws if errorIfTestverseEncountered is true and testverse alias encountered (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'rootverse+pkg-1:package.json', {
        errorIfTestverseEncountered: true
      })
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'testverse:setup.ts', {
        errorIfTestverseEncountered: true,
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkVerseNotAllowed(
        WellKnownImportAlias.Testverse,
        'testverse:setup.ts',
        '/in/some/file.abc'
      )
    );
  });

  it('throws if the alias suffix is "open" and the specifier is missing an extension (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() => ensureRawSpecifierOk(mockHybridrepoMappings, 'universe')).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'universe:some/file')
    ).toThrow(ErrorMessage.SpecifierNotOkMissingExtension('universe:some/file'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'universe:some/file', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension(
        'universe:some/file',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index')
    ).toThrow(ErrorMessage.SpecifierNotOkMissingExtension('multiverse+pkg-1:index'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension(
        'multiverse+pkg-1:index',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'testverse:setup', {
        errorIfTestverseEncountered: false
      })
    ).toThrow(ErrorMessage.SpecifierNotOkMissingExtension('testverse:setup'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'testverse:setup', {
        errorIfTestverseEncountered: false,
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension('testverse:setup', '/in/some/file.abc')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'typeverse:global')
    ).toThrow(ErrorMessage.SpecifierNotOkMissingExtension('typeverse:global'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'typeverse:global', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkMissingExtension(
        'typeverse:global',
        '/in/some/file.abc'
      )
    );
  });

  it('throws if the specifier equals "index.extensionToAppend" (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index.js')
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index.js', {
        extensionToAppend: '.js'
      })
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('multiverse+pkg-1:index.js'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index.js', {
        extensionToAppend: '.js',
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'multiverse+pkg-1:index.js',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index.ts')
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('multiverse+pkg-1:index.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:index.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'multiverse+pkg-1:index.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'universe:index.ts')
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('universe:index.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'universe:index.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'universe:index.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'testverse:index.ts', {
        errorIfTestverseEncountered: false
      })
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('testverse:index.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'testverse:index.ts', {
        errorIfTestverseEncountered: false,
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'testverse:index.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'typeverse:index.ts')
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('typeverse:index.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'typeverse:index.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'typeverse:index.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'rootverse:index.ts')
    ).toThrow(ErrorMessage.SpecifierNotOkUnnecessaryIndex('rootverse:index.ts'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'rootverse:index.ts', {
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkUnnecessaryIndex(
        'rootverse:index.ts',
        '/in/some/file.abc'
      )
    );
  });

  it('throws if packageId is defined and multiverse import used self-referentially (with optional path info)', async () => {
    expect.hasAssertions();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-2', {
        packageId: 'pkg-1'
      })
    ).not.toThrow();

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1', {
        packageId: 'pkg-1'
      })
    ).toThrow(ErrorMessage.SpecifierNotOkSelfReferential('multiverse+pkg-1'));

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1', {
        packageId: 'pkg-1',
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkSelfReferential('multiverse+pkg-1', '/in/some/file.abc')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:something.ts', {
        packageId: 'pkg-1'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkSelfReferential('multiverse+pkg-1:something.ts')
    );

    expect(() =>
      ensureRawSpecifierOk(mockHybridrepoMappings, 'multiverse+pkg-1:something.ts', {
        packageId: 'pkg-1',
        path: '/in/some/file.abc'
      })
    ).toThrow(
      ErrorMessage.SpecifierNotOkSelfReferential(
        'multiverse+pkg-1:something.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(
        mockHybridrepoMappings,
        'multiverse+pkg-1:something/wrong.ts',
        { packageId: 'pkg-1' }
      )
    ).toThrow(
      ErrorMessage.SpecifierNotOkSelfReferential('multiverse+pkg-1:something/wrong.ts')
    );

    expect(() =>
      ensureRawSpecifierOk(
        mockHybridrepoMappings,
        'multiverse+pkg-1:something/wrong.ts',
        { packageId: 'pkg-1', path: '/in/some/file.abc' }
      )
    ).toThrow(
      ErrorMessage.SpecifierNotOkSelfReferential(
        'multiverse+pkg-1:something/wrong.ts',
        '/in/some/file.abc'
      )
    );

    expect(() =>
      ensureRawSpecifierOk(
        mockHybridrepoMappings,
        'multiverse+pkg-2:something/wrong.ts',
        { packageId: 'pkg-1' }
      )
    ).not.toThrow();
  });
});

describe('::rawAliasToRegExp', () => {
  it('returns the expected regular expression from raw alias', async () => {
    expect.hasAssertions();

    const dummy = { group: WellKnownImportAlias.Universe, packageId: undefined };

    expect(
      rawAliasToRegExp({ prefix: 'exact', alias: 'a', suffix: 'exact', ...dummy })
    ).toStrictEqual(/^a$/);

    expect(
      rawAliasToRegExp({ prefix: 'none', alias: 'b', suffix: 'exact', ...dummy })
    ).toStrictEqual(/b$/);

    expect(
      rawAliasToRegExp({ prefix: 'exact', alias: 'c', suffix: 'none', ...dummy })
    ).toStrictEqual(/^c/);

    expect(
      rawAliasToRegExp({ prefix: 'none', alias: 'd', suffix: 'none', ...dummy })
    ).toStrictEqual(/d/);

    expect(
      rawAliasToRegExp({ prefix: 'exact', alias: 'e', suffix: 'open', ...dummy })
    ).toStrictEqual(/^e:(.+)$/);

    expect(
      rawAliasToRegExp({ prefix: 'none', alias: 'f', suffix: 'open', ...dummy })
    ).toStrictEqual(/f:(.+)$/);
  });
});
