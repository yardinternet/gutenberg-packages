# Row block

A must used block to create blocks and layouts on the page.
Any row contains one or more columns, column blocks is a child component of the row block.

## How to override presets or set a custom preset

Use this filter inside your theme

```

// Filter certain layouts
wp.hooks.addFilter(
	'yard-blocks.rowPresets',
	'yard-blocks/setRowPreset',
	(presets, window) => {
		const layouts = [ 'col-1-desktop-full-width', 'col-1-desktop-full-width-centered' ];
		return window.yardBlocks.filterPresetByLayoutIDs( presets, layouts ); // Optional if you want to filter specific presets
	}
);

// A custom preset with own images
wp.hooks.addFilter(
	'yard-blocks.rowPresets',
	'yard-blocks/setRowPreset',
	(presets, window) => {
		return {
			// custom preset
		}
	}
);


```
