/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

const defaultOptions = {
	category: 'yard-blocks',
	icon: {
		background: '#0293b0',
		foreground: '#fff',
	},
};

/**
 * @param {Array} blocks
 * @param {Object} options
 *
 */
export function registerBlocks( blocks = [], options = defaultOptions ) {
	if ( ! Array.isArray( blocks ) ) {
		throw 'Provided argument is not an array';
	}

	blocks.map( ( block ) => {
		const { name, icon, settings } = block;

		const blockSettings = applyFilters(
			'yard-blocks.blockSettings',
			settings,
			name
		);

		return registerBlockType( name, {
			...options,
			icon: {
				...options.icon,
				src: <BlockIcon faClasses={ icon } />,
			},
			...blockSettings,
		} );
	} );
}
