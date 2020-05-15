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
