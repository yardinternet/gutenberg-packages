/**
 * Internal dependencies
 */
import { preset } from './layout/presets';
import { filterPresetByLayoutIDs } from './layout';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Use function inside the filter preset
 */
window.yardBlocks = window.yardBlocks || {};
window.yardBlocks.filterPresetByLayoutIDs = filterPresetByLayoutIDs;

export const filteredPreset = applyFilters(
	'yard-blocks.rowPresets',
	preset,
	window
);
