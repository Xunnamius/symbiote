import { makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function ({
  asset,
  toProjectAbsolutePath
}) {
  return [
    {
      path: toProjectAbsolutePath(asset),
      generate: () => `
# * Paths below are ignored by prettier as well as remark and doctoc when called
# * with \`xscripts format\`.

# ! Note that any pattern with a / in the beginning OR MIDDLE (but not end) will
# ! be consider relative to the this file ONLY. Matching subdirs will NOT match!
# ! Otherwise, patterns will match entities in any directory or subdirectory.
# ! Prepend ** (or **/) if advanced subdir matching of complex paths is desired.
# ! See https://git-scm.com/docs/gitignore#_pattern_format

# Ignore temporary files in any subdir by giving them a special name
*.ignore
*.ignore.*
ignore.*

# Ignore sensitive files in any subdir
.env
.npmrc
*.local

# Ignore transpiled source in any subdir (used for advanced debugging)
.transpiled

# Ignore relevant build artifacts in any subdir (with exceptions)
*.tsbuildinfo
# ? Preceding AND proceeding asterisks (**) are needed to match any build subdir
# ? in monorepos and allow subsequent negations to be interpreted properly.
**/build/**
# ? This negation must end in "/**" to be interpreted properly.
!**/src/**/build/**
docs
dist
coverage
.vercel
.next
next-env.d.ts
CHANGELOG.md
LICENSE
LICENSE.md

# Ignore relevant NPM artifacts in any subdir
node_modules
package-lock.json

# Ignore test fixtures in any subdir (which may depend on remaining as they are)
fixtures

# Ignore things that prettier isn't good at in any subdir
*.hbs

# Ignore random nothingness in any subdir
.DS_Store
`
    }
  ];
});