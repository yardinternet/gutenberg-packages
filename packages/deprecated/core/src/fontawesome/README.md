# FontAwesome

Display's a fontawesome icon with a possible description inside a block.
The current version is 5.6.3 and is registered inside the package.json.
The fonts files are copied from the node_modules folder.

Icon and text styling are customizable with the inspector controls. Description can also be a link.

## Why webfonts

When handling SVG icon you need to add each icon to the library in order to use them.
In our situation we want to autocomplete the icon based on what the user is typing so we need a list of all icons.
All icons are defined inside the settings/icons.js file.

See https://fontawesome.com/how-to-use/on-the-web/other-topics/performance for more details
