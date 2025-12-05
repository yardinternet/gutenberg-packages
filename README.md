# Gutenberg Packages

Contains several packages that are used in Yard | Digital Agency WordPress projects.

## 👷‍♀️ Package Development

### Initial Setup

1. Copy `.npmrc.example` to `.npmrc` and add your tokens.
2. Run `npm install` in the root directory to install all dependencies for all packages.

### Developing package in project or theme

1. Run `npm link` inside the `gutenberg-package/packages/<package>` directory.
2. Run `npm link <package-json-name>` inside the project or theme directory.

This creates a symbolic link between the packages, allowing you to work on the package while making changes in the project or theme by running `npm start`.

### Unlink

1. To unlink a package from your theme, run `npm unlink --no-save <package>`.

Note: Omitting `--no-save` will remove the package from your `package.json` file.

2. Run `npm unlink` inside the `gutenberg-package/packages/<package>` directory.

Alternatively, running `npm install` in your theme will also remove the linked version.

## 🚀 Releasing packages

Run `HUSKY=0 lerna publish` to publish packages to the GitHub Package Registry. Lerna checks each package for changes and lets you decide which version to upgrade. It then pushes the changes to GitHub.

As a general rule, only update packages from the master branch. For feature branches or development, you can publish alpha releases.

### How lerna identifies package changes

Lerna identifies individual package changes, even when the package itself is not modified. For example, if a package called `package-foo` depends on `package-bar`, and you make changes to `package-bar`, Lerna will update the `package.json` file of `package-foo`.

### Recover from a failed publish

Lerna uses git tags to track published versions. If a publish fails, you need to remove these tags and the newly created commits and try again. Here's how to recover:

1. Check which tags were created. Remove them from origin `git push -d origin {tagname}`
2. Sync your local tags with the tags from origin `git fetch --prune --prune-tags`
3. Remove the created commits `git reset HEAD~{number-of-commits} --hard`
4. Push your git history `git push --force-with-lease`

After completing these steps, address the issue that caused the publish to fail and try publishing again.

## 🎨 Formatting & Linting

This repository includes built-in support for ESLint and Prettier. Husky ensures that all files are automatically formatted and linted with each commit. Additionally, a GitHub action runs to verify and enforce code formatting and linting with every commit.

## About us

[![banner](https://raw.githubusercontent.com/yardinternet/.github/refs/heads/main/profile/assets/small-banner-github.svg)](https://www.yard.nl/werken-bij/)
