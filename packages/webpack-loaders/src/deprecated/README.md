# (DEPRECATED) Webpack loaders for Gutenberg

> Old README.md content. This is deprecated, please use the `addPackagesToConfig` function instead.

Since all packages directly loaded in themes, theme blocks, plugins we need to support syntax and file types with webpack-loaders.
When you load `@yardinternet/gutenberg-editor-components` inside your theme it's directly included in your theme webpack build.
Run `npm start` and you see a lot of errors that certain types are not supported.
To solve this problem, you need to install all related loaders that `gutenberg-editor-components` contains.

This package solves that problem by giving you a default webpack loader, so you don't have to write custom code.
Any new syntax or filetypes must be added inside this package, and all projects will benefit.

This package is a wrapper around @wordpress/scripts.

## Schema

![](schema.png)

## Example webpack.config.js

With this setup, you can still modify the config returned by the gutenbergPackagesConfig

```JS
const path = require("path");
const {
    gutenbergPackagesConfig
} = require("@yardinternet/gutenberg-webpack-loaders");

const exclude = [
    "@yardinternet/gutenberg-cards",
    "@yardinternet/gutenberg-editor-components",
    "@yardinternet/gutenberg-google-maps"
];

const config = gutenbergPackagesConfig({ packages: exclude });

module.exports = {
    ...config,
    output: {
        filename: "blocks.js",
        path: path.resolve(process.cwd(), "../assets/dist/js")
    }
};

```
