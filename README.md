![format & lint](https://github.com/yardinternet/gutenberg-packages/workflows/format%20&%20lint/badge.svg)
![tests](https://github.com/yardinternet/gutenberg-packages/workflows/tests/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Gutenberg Packages

## Github actions

### format & lint

Runs the code trough a formatter and commits the format code if necassery. After formatting, the linter will run.

## Format & lint

This repos has builtin support for eslint and prettier. To enable formatting make sure the following setting is in your user perferences

```JSON
   "editor.formatOnSave": true
```

Husky will run on each commit to making sure all files are formatted and linted.
