# Webpack loaders for Gutenberg

Helper functions to add packages to the `@wordpress/scripts` configuration.

## Background

All packages in the `@yardinternet/gutenberg-packages` **do not** provide a `/build` folder with compiled files. This is because pre-compiling components causes problems within the WordPress ecosystem:

- Dependency management and version conflicts: Pre-building components may lead to version conflicts with other WordPress packages. This will cause unexpected behavior or errors, version lock-in and difficulty in updating dependencies.
- Maintenance overhead: Maintaining an asset build for each package adds overhead in terms of maintenance and deployment.
- Customization limitations: Pre-built components limit the flexibility to customize and extend functionality.

So when using a package in your theme or plugin, you will **have to compile @yardinternet/gutenberg-packages in within your theme**, which requires all the related loaders.

Luckily, all related loaders are already in `@wordpress/scripts`. All we need to do, is add the packages to the `@wordpress/scripts` configuration, so that it includes compiling the packages when running `npm start`.

This package provides some helper functions to add the packages to the `@wordpress/scripts` configuration.

## Example `addPackagesToConfig`

```JS
const { addPackagesToConfig } = require("@yardinternet/gutenberg-webpack-loaders");
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' ); // Original config from the @wordpress/scripts package.

module.exports = {
 ...addPackagesToConfig( defaultConfig, [
  '@yardinternet/gutenberg-components',
  '@yardinternet/gutenberg-hooks',
 ] ),
};
```
