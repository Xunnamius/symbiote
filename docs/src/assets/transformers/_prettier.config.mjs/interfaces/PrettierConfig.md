[**@-xun/symbiote**](../../../../../README.md)

***

[@-xun/symbiote](../../../../../README.md) / [src/assets/transformers/\_prettier.config.mjs](../README.md) / PrettierConfig

# Interface: PrettierConfig

Defined in: node\_modules/prettier/index.d.ts:309

For use in `.prettierrc.js`, `.prettierrc.ts`, `.prettierrc.cjs`, `.prettierrc.cts`, `prettierrc.mjs`, `prettierrc.mts`, `prettier.config.js`, `prettier.config.ts`, `prettier.config.cjs`, `prettier.config.cts`, `prettier.config.mjs`, `prettier.config.mts`

## Extends

- `Options`

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### \_\_embeddedInHtml?

> `optional` **\_\_embeddedInHtml**: `boolean`

Defined in: node\_modules/prettier/doc.d.ts:226

#### Inherited from

`Options.__embeddedInHtml`

***

### arrowParens?

> `optional` **arrowParens**: `"always"` \| `"avoid"`

Defined in: node\_modules/prettier/index.d.ts:403

Include parentheses around a sole arrow function parameter.

#### Default

```ts
"always"
```

#### Inherited from

`Options.arrowParens`

***

### bracketSameLine?

> `optional` **bracketSameLine**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:355

Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being
alone on the next line (does not apply to self closing elements).

#### Default

```ts
false
```

#### Inherited from

`Options.bracketSameLine`

***

### bracketSpacing?

> `optional` **bracketSpacing**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:344

Print spaces between brackets in object literals.

#### Default

```ts
true
```

#### Inherited from

`Options.bracketSpacing`

***

### checkIgnorePragma?

> `optional` **checkIgnorePragma**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:392

Prettier can allow individual files to opt out of formatting if they contain a special comment, called a pragma, at the top of the file.

#### Default

```ts
false
```

#### Inherited from

`Options.checkIgnorePragma`

***

### embeddedLanguageFormatting?

> `optional` **embeddedLanguageFormatting**: `"off"` \| `"auto"`

Defined in: node\_modules/prettier/index.d.ts:432

Control whether Prettier formats quoted code embedded in the file.

#### Default

```ts
"auto"
```

#### Inherited from

`Options.embeddedLanguageFormatting`

***

### endOfLine?

> `optional` **endOfLine**: `"auto"` \| `"lf"` \| `"crlf"` \| `"cr"`

Defined in: node\_modules/prettier/index.d.ts:417

Which end of line characters to apply.

#### Default

```ts
"lf"
```

#### Inherited from

`Options.endOfLine`

***

### experimentalOperatorPosition?

> `optional` **experimentalOperatorPosition**: `"start"` \| `"end"`

Defined in: node\_modules/prettier/index.d.ts:442

Where to print operators when binary expressions wrap lines.

#### Default

```ts
"end"
```

#### Inherited from

`Options.experimentalOperatorPosition`

***

### experimentalTernaries?

> `optional` **experimentalTernaries**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:448

Use curious ternaries, with the question mark after the condition, instead
of on the same line as the consequent.

#### Default

```ts
false
```

#### Inherited from

`Options.experimentalTernaries`

***

### filepath?

> `optional` **filepath**: `string`

Defined in: node\_modules/prettier/index.d.ts:373

Specify the input filepath. This will be used to do parser inference.

#### Inherited from

`Options.filepath`

***

### htmlWhitespaceSensitivity?

> `optional` **htmlWhitespaceSensitivity**: `"ignore"` \| `"strict"` \| `"css"`

Defined in: node\_modules/prettier/index.d.ts:412

How to handle whitespaces in HTML.

#### Default

```ts
"css"
```

#### Inherited from

`Options.htmlWhitespaceSensitivity`

***

### insertPragma?

> `optional` **insertPragma**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:387

Prettier can insert a special

#### Format

marker at the top of files specifying that
the file has been formatted with prettier. This works well when used in tandem with
the --require-pragma option. If there is already a docblock at the top of
the file then this option will add a newline to it with the

#### Format

marker.

#### Default

```ts
false
```

#### Inherited from

`Options.insertPragma`

***

### ~~jsxBracketSameLine?~~

> `optional` **jsxBracketSameLine**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:454

Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.

#### Default

```ts
false
```

#### Deprecated

use bracketSameLine instead

#### Inherited from

`Options.jsxBracketSameLine`

***

### jsxSingleQuote?

> `optional` **jsxSingleQuote**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:334

Use single quotes in JSX.

#### Default

```ts
false
```

#### Inherited from

`Options.jsxSingleQuote`

***

### objectWrap?

> `optional` **objectWrap**: `"preserve"` \| `"collapse"`

Defined in: node\_modules/prettier/index.d.ts:349

How to wrap object literals.

#### Default

```ts
"preserve"
```

#### Inherited from

`Options.objectWrap`

***

### overrides?

> `optional` **overrides**: `object`[]

Defined in: node\_modules/prettier/index.d.ts:310

#### excludeFiles?

> `optional` **excludeFiles**: `string` \| `string`[]

#### files

> **files**: `string` \| `string`[]

#### options?

> `optional` **options**: `Options`

***

### parentParser?

> `optional` **parentParser**: `string`

Defined in: node\_modules/prettier/doc.d.ts:225

#### Inherited from

`Options.parentParser`

***

### parser?

> `optional` **parser**: `LiteralUnion`\<`BuiltInParserName`, `string`\>

Defined in: node\_modules/prettier/index.d.ts:369

Specify which parser to use.

#### Inherited from

`Options.parser`

***

### plugins?

> `optional` **plugins**: (`string` \| `URL` \| `Plugin`\<`any`\>)[]

Defined in: node\_modules/prettier/index.d.ts:407

Provide ability to support new languages to prettier.

#### Inherited from

`Options.plugins`

***

### printWidth?

> `optional` **printWidth**: `number`

Defined in: node\_modules/prettier/doc.d.ts:214

Specify the line length that the printer will wrap on.

#### Default

```ts
80
```

#### Inherited from

`Options.printWidth`

***

### proseWrap?

> `optional` **proseWrap**: `"never"` \| `"always"` \| `"preserve"`

Defined in: node\_modules/prettier/index.d.ts:398

By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.

#### Default

```ts
"preserve"
```

#### Inherited from

`Options.proseWrap`

***

### quoteProps?

> `optional` **quoteProps**: `"preserve"` \| `"as-needed"` \| `"consistent"`

Defined in: node\_modules/prettier/index.d.ts:422

Change when properties in objects are quoted.

#### Default

```ts
"as-needed"
```

#### Inherited from

`Options.quoteProps`

***

### rangeEnd?

> `optional` **rangeEnd**: `number`

Defined in: node\_modules/prettier/index.d.ts:365

Format only a segment of a file.

#### Default

```ts
Number.POSITIVE_INFINITY
```

#### Inherited from

`Options.rangeEnd`

***

### rangeStart?

> `optional` **rangeStart**: `number`

Defined in: node\_modules/prettier/index.d.ts:360

Format only a segment of a file.

#### Default

```ts
0
```

#### Inherited from

`Options.rangeStart`

***

### requirePragma?

> `optional` **requirePragma**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:379

Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
This is very useful when gradually transitioning large, unformatted codebases to prettier.

#### Default

```ts
false
```

#### Inherited from

`Options.requirePragma`

***

### semi?

> `optional` **semi**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:324

Print semicolons at the ends of statements.

#### Default

```ts
true
```

#### Inherited from

`Options.semi`

***

### singleAttributePerLine?

> `optional` **singleAttributePerLine**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:437

Enforce single attribute per line in HTML, Vue and JSX.

#### Default

```ts
false
```

#### Inherited from

`Options.singleAttributePerLine`

***

### singleQuote?

> `optional` **singleQuote**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:329

Use single quotes instead of double quotes.

#### Default

```ts
false
```

#### Inherited from

`Options.singleQuote`

***

### tabWidth?

> `optional` **tabWidth**: `number`

Defined in: node\_modules/prettier/doc.d.ts:219

Specify the number of spaces per indentation-level.

#### Default

```ts
2
```

#### Inherited from

`Options.tabWidth`

***

### trailingComma?

> `optional` **trailingComma**: `"all"` \| `"none"` \| `"es5"`

Defined in: node\_modules/prettier/index.d.ts:339

Print trailing commas wherever possible.

#### Default

```ts
"all"
```

#### Inherited from

`Options.trailingComma`

***

### useTabs?

> `optional` **useTabs**: `boolean`

Defined in: node\_modules/prettier/doc.d.ts:224

Indent lines with tabs instead of spaces

#### Default

```ts
false
```

#### Inherited from

`Options.useTabs`

***

### vueIndentScriptAndStyle?

> `optional` **vueIndentScriptAndStyle**: `boolean`

Defined in: node\_modules/prettier/index.d.ts:427

Whether or not to indent the code inside <script> and <style> tags in Vue files.

#### Default

```ts
false
```

#### Inherited from

`Options.vueIndentScriptAndStyle`
