# Block Filters

Contains block filters to override block behavior.

## Install

```JS
npm i @yardinternet/gutenberg-block-filters --save
```

## How to enable blockFilters

Add the following to your hook.js

```JS
import { BlockFilters } from '@yardinternet/gutenberg-block-filters';

const blockFilters = {
    'core/file/filesize': {
        append: ')',
        prepend: '(', // add extra options from project
    },
};

BlockFilters(blockFilters);

```

## Available blockFilters

### core/file/filesize

#### description

Adds filesize to each file block

#### config

None
