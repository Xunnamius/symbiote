import { makeTransformer } from 'universe:assets.ts';

export const { transformer } = makeTransformer(function ({
  asset,
  toProjectAbsolutePath
}) {
  return [
    {
      path: toProjectAbsolutePath(asset),
      generate: () => `
# ! Note that any pattern with a / in the beginning OR MIDDLE (but not end) will
# ! be consider relative to the this file ONLY. Matching subdirs will NOT match!
# ! Otherwise, patterns will match entities in any directory or subdirectory.
# ! Prepend ** (or **/) if advanced subdir matching of complex paths is desired.
# ! See https://git-scm.com/docs/gitignore#_pattern_format

# Ignore temporary files in any subdir by giving them a special name
*.ignore
*.ignore.*
ignore.*
tmp

# Ignore sensitive files in any subdir
.env
.npmrc
*.local

# Ignore transpiled source in any subdir (used for advanced debugging)
.transpiled

# Ignore packaged files that probably shouldn't be committed
*.tgz

# Ignore relevant build artifacts in any subdir (with exceptions)
*.tsbuildinfo
# ? Preceding asterisks "**/" are needed to match any build subdir in monorepos
# ? and proceeding asterisks "/**" allow subsequent negations to be interpreted
# ? properly. See: https://git-scm.com/docs/gitignore#_pattern_format
**/build/**
# ? This and other negations must end in "/**" to be interpreted properly.
!**/src/**/build/**
# ? This and other negations must end in "/**" to be interpreted properly.
!**/docs/**/build/**
dist
coverage
lib-cov
.nyc_output
.grunt
bower_components
.lock-wscript
build/Release
.vercel
.next
next-env.d.ts

# Ignore cloned GitHub wiki (do not regard it as a so-called "submodule")
# ? Note that this complex path is relative to this file
/.wiki

# Ignore local vscode configuration
# ? Note that this complex path is relative to this file
/.vscode/**
# ? Note that this complex path is relative to this file
!/.vscode/*.example.json

# Ignore relevant NPM and JSPM artifacts in any subdir
.npm
node_modules
jspm_packages

# Ignore logs in any subdir
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Ignore random nothingness in any subdir
.eslintcache
.node_repl_history
.yarn-integrity
*.DS_Store
.AppleDouble
.LSOverride
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk
pids
*.pid
*.seed
*.pid.lock
Thumbs.db
ehthumbs.db
ehthumbs_vista.db
Desktop.ini
$RECYCLE.BIN
*.cab
*.msi
*.msm
*.msp
*.lnk
_book
CertificateAuthorityCertificate.pem
`
    }
  ];
});