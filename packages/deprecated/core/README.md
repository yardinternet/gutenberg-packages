# Gutenberg core

This package contains core gutenberg blocks.

## Install

```JS
npm install npm install @yardinternet/gutenberg-core --save
```

## Usage

```JS
import { registerBlocks } from '@yardinternet/gutenberg-core';

registerBlocks();
```

Import CSS into editor styles. Enqueue the compiled editor CSS on `enqueue_block_assets` so it loads inside the iframed editor canvas.

```CSS
@import '~@yardinternet/gutenberg-core/src/collapse/editor';
@import '~@yardinternet/gutenberg-core/src/spacer/editor';
```

## Hooks

Available hooks

### Spacer

Add extra steps to the spacer block.

```JS
addFilter(
	'yard-blocks.gutenberg-core.spacer',
	'gutenberg-core',
	() => {
        return 7;
        }
);
```
