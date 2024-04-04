/**
 * Internal dependencies
 */
import * as ButtonBlockFilters from './core/button/icon';
import * as ColumnBlockFilters from './core/column/visibility';
import * as FileBlockFilters from './core/file/filesize';

import { registerBlockFilters } from './helpers';

const availableFilters = [
	ColumnBlockFilters,
	ButtonBlockFilters,
	FileBlockFilters,
];

/**
 * Initial config
 */
const initialConfig = {
	'core/button/icon': {},
	'core/column/visibility': {},
	'core/file/filesize': {},
};

/**
 * Bootstrap BlockFilters
 *
 * @param {Object} defaultConfig
 */
export function BlockFilters( defaultConfig = initialConfig ) {
	return registerBlockFilters( {
		blockFilters: availableFilters,
		config: defaultConfig,
	} );
}
