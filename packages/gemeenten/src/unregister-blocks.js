/**
 * WordPress dependencies
 */
import { unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

const unregisterBlocks = [ 'core/search' ];

domReady( function () {
	unregisterBlocks.map( ( block ) => unregisterBlockType( block ) );
} );
