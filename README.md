![format & lint](https://github.com/yardinternet/gutenberg-packages/workflows/format%20&%20lint/badge.svg)
![tests](https://github.com/yardinternet/gutenberg-packages/workflows/tests/badge.svg)
![auto-changelog](https://github.com/yardinternet/gutenberg-packages/workflows/auto-changelog/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Gutenberg Packages

## Package development

### Developing package in project or theme

1. Run `npm link` inside the gutenberg-package/packages/<package>
2. Run `npm link <package>` inside the project or theme

`npm link` creates a symbolic link between the packages.
Run `npm start` inside theme or project and make changes in the gutenberg-packages project and the code compiles.

### Releasing packages

Run `lerna publish` to publish packages to the Github package registry.
Lerna will check per package if it contains changes and let you decide what version to upgrade.

## When to publish

As a rule of thumb, **only update packages from the master branch**

In feature branch or development you can publish alpha releases

### Why lerna finds invidual package changes without changing it?

When changes made to a package that another package depends on, lerna will update the package.json file.
As example: package-foo has a dependency on package-bar. When you make changes to package-bar, it will update the package.json file of package-foo.

## Github actions

### format & lint

Runs the code trough a formatter and commits the format code if necassery. After formatting, the linter will run.

## Format & lint

This repos has builtin support for eslint and prettier. To enable formatting make sure the following setting is in your user perferences

```JSON
   "editor.formatOnSave": true
```

Husky will run on each commit to making sure all files are formatted and linted.
