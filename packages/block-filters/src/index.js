import * as FileBlockFilters from './core/file/filesize';
import { registerBlockFilters } from './helpers';

const availableFilters = [ FileBlockFilters ];

/**
 * Initial config
 */
const initialConfig = {
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
