# Gutenberg Pre-Publish Checklist

Add a checklist before publishing the content. The checklist can be changed per post type.

To use taxonomies in the checklist it is important to do the following for all taxonomies:

1. Remove: `'meta_box' => 'simple'`
2. Add: `'show_in_rest' => true`

## Install

```js
npm install @yardinternet/gutenberg-pre-publish-checklist --save
```

## Usage

### JS

```js
import { registerPrePublishChecklist } from '@yardinternet/gutenberg-pre-publish-checklist';
registerPrePublishChecklist();
```

### Styling

Import the editor styles (outside the yard-blocks-backend mixin).

``` scss
@import '~@yardinternet/gutenberg-pre-publish-checklist/src/editor';
```

### Hooks

#### Settings

Alter or override settings with this hook. Place this filter before `registerPrePublishChecklist`.

``` js
addFilter(
    'yard-blocks.prePublishChecklist',
    'yard-blocks',
    () => [
        {
            postType: 'page',
            title: {
                required: true,
            },
            wordCount: {
                required: true,
                minWords: 50,
                maxWords: 1000,
            },
            featuredImage: {
                required: true,
            },
            excerpt: {
                required: true,
            },
            taxonomies: [
                {
                    name: 'Taxonomy',
                    key: '_ys_taxonomy',
                    minSelected: 1,
                    maxSelected: 3,
                },
            ],
        }
    ]
);
```

Add custom checks with this hook.

``` js
addFilter(
    'yard-blocks.prePublishChecklistCustomCheck',
    'yard-blocks',
    () => [
        {
            hasError: true,
            msg: 'Dit is de error melding'
        }
    ]
);
```
