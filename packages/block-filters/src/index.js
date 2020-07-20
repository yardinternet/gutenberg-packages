/**
 * Internal dependencies
 */
import * as FileBlockFilters from './core/file/filesize';
import * as ButtonBlockFilters from './core/button/icon';
import { registerBlockFilters } from './helpers';

const availableFilters = [ FileBlockFilters, ButtonBlockFilters ];

/**
 * Initial config
 */
const initialConfig = {
	'core/file/filesize': {},
	'core/button/icon': {},
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
