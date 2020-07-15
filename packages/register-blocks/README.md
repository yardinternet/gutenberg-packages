# Register Blocks

It provides a registerBlocks method to register blocks.
This package, used by the Yard Blocks plugin and several Fusion Whitelabel projects

## Install

```JS
npm install @yardinternet/gutenberg-register-blocks --save
```

## Usage

```js
const blocks = [
    alert,
    breadcrumbs,
    buttonGroup,
    card,
    carousel,
    facetwp,
    fontawesome,
    googlemap,
    grid,
    gridColumn,
];

registerBlocks( blocks );

```

## Overrides

The second param allows overriding the defaultOptions.
DefaultOptions allows us to change the icon or the category.

```js
const options = {
    category: 'theme-fusion',
    icon: {
        background: 'red',
        foreground: '#fff',
    },
};

registerBlocks( bocks, options )

```