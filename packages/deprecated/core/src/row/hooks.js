/**
 * Internal dependencies
 */
import { preset } from './layout/presets';
import { filterPresetByLayoutIDs } from './layout';

const { applyFilters } = wp.hooks;

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
