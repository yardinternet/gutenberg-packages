import * as FileBlockFilters from './core/file';
import { registerBlockFilters } from './helpers';
import { blocks } from './config';

const availableFilters = [ FileBlockFilters ];
const { coreFile } = blocks;

/**
 * Initial config
 */
const initialConfig = {
	[ coreFile ]: {
		showFileSize: true,
	},
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
