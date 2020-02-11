/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Returns the bootstrap spacing util class for margin and padding
 *
 * @param {Array} | contains input [ 'p', 'md', '5' ]
 * @return {string} p-md-5
 */
export function getSpacingUtilClass( [
	prop = '',
	viewport = '',
	value = '',
] ) {
	const number = value.replace( '-', 'n' );
	return [ prop, viewport, number ]
		.filter( ( item ) => item.length )
		.join( '-' );
}

/**
 * Adds block at the last index
 * Most used with InnerBlocks see button-group as example
 *
 * @param {*} param0
 */
export function insertBlockAtEnd( {
	clientId,
	blockName,
	attributes = {},
	innerblocks = [],
} ) {
	const { getBlockOrder } = select( 'core/block-editor' );

	const { insertBlocks } = dispatch( 'core/block-editor' );

	const block = createBlock( blockName, attributes, innerblocks );

	insertBlocks( block, getBlockOrder( clientId ).length, clientId );
}
