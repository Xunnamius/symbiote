// @ts-check
'use strict';

/* eslint-disable no-console */
const read = require('node:fs/promises').readFile;

const spellcheck = require('spellchecker');
const debug = require('debug')('commit-spell');

const tryToRead = async (
  /** @type {import("fs").PathLike | import("fs/promises").FileHandle} */ path
) => {
  try {
    debug(`attempting to read ${String(path)}`);
    const data = await read(path, 'utf8');
    debug(`successfully read ${String(path)}`);
    return data;
  } catch {
    debug(`failed to read ${String(path)}`);
    return '';
  }
};

const asJson = (/** @type {string} */ str) => {
  try {
    const json = JSON.parse(str);
    debug('json parse successful!');
    return [
      ...(json?.['cSpell.words'] || []),
      ...(json?.['cSpell.userWords'] || []),
      ...(json?.['cSpell.ignoreWords'] || [])
    ];
  } catch {
    debug('json parse failed!');
    return [];
  }
};

const asText = (/** @type {string} */ str) => str.split('\n');
const isCamelCase = (/** @type {string} */ w) => /^[a-z]+[A-Z]+.*$/.test(w);
const isAllCaps = (/** @type {string} */ w) => /^[^a-z]+$/.test(w);

const isPascalCase = (/** @type {string} */ w) =>
  /^([A-Z]{2,}.+|[A-Z][a-z]+[A-Z].*)$/.test(w);

const splitOutWords = (/** @type {string} */ phrase) =>
  [...phrase.split(/[^A-Za-z]+/g), phrase].filter(Boolean);

const keys = (/** @type {{}} */ obj = {}) =>
  Object.keys(obj).map((k) => splitOutWords(k));

void (async () => {
  const pkgFile = await tryToRead('./package.json');
  const pkg = pkgFile ? JSON.parse(pkgFile) : {};
  const lastCommitMessage = (await read('./.git/COMMIT_EDITMSG'), 'utf8');
  const homeDir = require('node:os').homedir();

  debug(`lastCommitMsg: ${lastCommitMessage}`);
  debug(`homeDir: ${homeDir}`);

  const ignoreWords = new Set(
    Array.from(
      new Set(
        [
          ...(await Promise.all([
            tryToRead('./.spellcheckignore').then(asText),
            tryToRead(`${homeDir}/.config/_spellcheckignore`).then(asText),
            tryToRead('./.vscode/settings.json').then(asJson),
            tryToRead(`${homeDir}/.config/Code/User/settings.json`).then(asJson)
          ])),
          ...(await import('text-extensions')).default,
          // ? Popular contractions
          've',
          're',
          's',
          'll',
          't',
          'd',
          'o',
          'ol',
          ...keys(pkg.dependencies),
          ...keys(pkg.devDependencies),
          ...keys(pkg.scripts),
          ...splitOutWords(
            (
              await (
                await import('execa')
              ).execa('git', ['log', '--format="%B"', 'HEAD~1'])
            ).stdout
          ).slice(0, -1)
        ]
          .flat()
          .filter(Boolean)
          .flatMap((word) => splitOutWords(word.trim().toLowerCase()))
      )
    )
  );

  const typos = Array.from(
    new Set(
      spellcheck
        .checkSpelling(lastCommitMessage)
        .flatMap((typoLocation) =>
          lastCommitMessage.slice(typoLocation.start, typoLocation.end).trim().split("'")
        )
        .filter((w) => !isAllCaps(w) && !isCamelCase(w) && !isPascalCase(w))
        .map((w) => w.toLowerCase())
        .filter((typo) => !ignoreWords.has(typo))
    )
  );

  debug('typos: %O', typos);

  if (typos.length) {
    console.warn('WARNING: there may be misspelled words in your commit message!');
    console.warn('Commit messages can be fixed before push with `git commit -S --amend`');
    console.warn('---');

    for (const typo of typos.slice(0, 5)) {
      const corrections = spellcheck.getCorrectionsForMisspelling(typo);
      const suggestion = corrections.length
        ? ` (did you mean ${corrections.slice(0, 5).join(', ')}?)`
        : '';

      console.warn(`${typo}${suggestion}`);
    }

    if (typos.length > 5) {
      console.warn(`${typos.length - 5} more...`);
    }

    if (typos.length) {
      console.warn('---');
    }
  }
})();
