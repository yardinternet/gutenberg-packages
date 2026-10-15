/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Returns the bootstrap spacing util class for margin and padding
 *
 * @param {Array} contains input [ 'p', 'md', '5' ]
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

/**
 * Appends loaded script to DOM
 *
 * @param {*}        src url
 * @param {Document} doc document to load the script into, e.g. the editor canvas iframe
 * @return {Promise} promise
 */
export function loadScript( src, doc = document ) {
	return new Promise( function ( resolve, reject ) {
		const script = doc.createElement( 'script' );
		script.src = src;
		script.async = true;
		script.onload = () => resolve( script );
		script.onerror = () =>
			reject( new Error( 'Script load error: ' + src ) );

		doc.body.appendChild( script );
	} );
}

/**
 * Returns the color slug
 *
 * @param {Object} colors - colorpallete global variable
 * @param {string} color  - hexcolor
 * @return {string} - primary
 */
export function getColorClassByColor( colors, color ) {
	return Object.values( colors || {} ).find(
		( item ) => item?.color === color
	)?.slug;
}

/**
 * Returns the color slug background class
 *
 * @param {Object} colors - colorpallete global variable
 * @param {string} color  - hexcolor
 * @return {string} - bg-primary
 */
export function getBackgroundClassByColor( colors, color ) {
	const slug = getColorClassByColor( colors, color );
	return slug !== undefined ? `bg-${ slug }` : slug;
}

/**
 * Return the image props based on a chosen image size
 *
 * @param {Object} image
 * @param {string} imageSize
 */
export const pickRelevantMediaFiles = ( image = {}, imageSize = 'full' ) => {
	const imageProps = Object.fromEntries(
		[ 'alt', 'id', 'link', 'caption' ]
			.filter( ( key ) => key in Object( image ) )
			.map( ( key ) => [ key, image[ key ] ] )
	);
	imageProps.url =
		image?.sizes?.[ imageSize ]?.url ||
		image?.media_details?.sizes?.[ imageSize ]?.source_url ||
		image.url;

	return imageProps;
};

/**
 * Convert the image object so that pickRelevantMediaFiles can use it.
 *
 * @param {Object} image
 */
export const convertPickedMediaFiles = ( image = {} ) => {
	if ( Object.getOwnPropertyNames( image ).length > 0 ) {
		if ( image.caption.raw || image.caption.raw === '' ) {
			const caption = image.caption.raw;
			delete image.caption;
			image.caption = caption;
		}

		image.sizes = image.media_details.sizes;
		image.alt = image.alt_text;
		image.url = image.source_url;
	}

	return image;
};

/**
 * Return default values for each attribute
 *
 * @param {*} attributes - gutenberg attributes
 * @return {Object} - { bgColor: 'red' }
 */
export function extractDefaultValues( attributes ) {
	const obj = {};

	Object.keys( attributes ).map( ( attribute ) => {
		return ( obj[ attribute ] = attributes[ attribute ].default );
	} );

	return obj;
}
