# @yardinternet/gutenberg-block-restrictions

Small helper to restrict allowed inner blocks based on parent block rules.

## Usage

```js
import { registerBlockRestrictions } from '@yardinternet/gutenberg-block-restrictions';
```

### 1) With PHP config (via window object)

```php
<?php

return [
    'blockSets' => [
        'content' => [
			'core/button',
			'core/buttons',
			'core/heading',
			'core/list-item',
			'core/list',
		],
        'minimalContent' => [
			'core/paragraph'
		],
    ],
    'innerBlockRestrictions' => [
        'core/media-text' => [
            'blockSet' => 'minimalContent',
        ],
        'yard/collapse-item' => [
            'blockSet' => 'content',
            'remove' => [ 
				'core/list', 
			],
        ],
    ],
];
```

```js
import { registerBlockRestrictions } from '@yardinternet/gutenberg-block-restrictions';

const { innerBlockRestrictions, blockSets } = window.theme.gutenbergConfig;

registerBlockRestrictions( {
	innerBlockRestrictions,
	blockSets,
} );
```

### 2) Without PHP config (supply objects yourself)

```js
import { registerBlockRestrictions } from '@yardinternet/gutenberg-block-restrictions';

registerBlockRestrictions( {
	blockSets: {
		minimalContent: [ 
			'core/paragraph', 
			'core/heading' 
		],
	},
	innerBlockRestrictions: {
		'core/media-text': {
			blockSet: 'minimalContent',
			add: [ 'core/list' ],
			remove: [ 'core/heading' ],
		},
	},
} );
```

## Rule shape

-   `blockSet`: name of a set from `blockSets`
-   `add`: optional extra blocks to include
-   `remove`: optional blocks to exclude from the final list

## Conditional rules (`when`)

Restrict inner blocks per block instance instead:

```php
'innerBlockRestrictions' => [
		'core/group' => [
			'add' => [
				'theme/card',
			],
			'when' => [
				[
					'className' => 'pattern-grid-identity-login',
					'add' => ['theme/identity-login'],
				],
				[
					'className' => 'pattern-grid-cards',
					'add' => ['theme/card'],
				],
				[
					'postType' => 'pdc-item',
					'add' => [
						'theme/card',
						'yard/query',
					],
				],
			],
		],
],
```

- Matchers: `className`, `postType`, `parentVariation`. String or array (any-of).
- All matchers must match. First match wins and replaces the rule next to `when`.
- No match: rule next to `when` applies.
- Child blocks: use `ancestor`, not `parent`. Gutenberg lets `parent` bypass `allowedBlocks`.
