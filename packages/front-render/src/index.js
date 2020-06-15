import { cloneElement } from '@wordpress/element';

/**
 * Creates a data-{value} key for each given property
 *
 * @param {Object} data
 * @return {Object} - dataAttributes
 */
function parseData( data = {} ) {
	const props = {};

	Object.keys( data ).map( ( item ) => {
		if ( ! data[ item ] || data[ item ].length === 0 ) {
			return [];
		}

		return ( props[ 'data-' + item ] =
			typeof data[ item ] === 'string'
				? data[ item ]
				: JSON.stringify( data[ item ] ) );
	} );

	return props;
}

/**
 * Add data props to the wrapped element
 *
 * @param {Element} WrappedComponent
 * @param {Object} data
 * @return {Element} - Element
 */
function withSaveDataAttributes( WrappedComponent, data = {} ) {
	return cloneElement( WrappedComponent, { ...parseData( data ) } );
}

function withFrontRender( { Component, element } ) {
	const props = { kamelenTeen: 'haha' };

	Object.keys( element.dataset ).map( ( item ) => {
		const value = element.dataset[ item ];
		return ( props[ item ] = JSON.parse( value ) );
	} );

	return <Component { ...props } />;
}

export { parseData, withSaveDataAttributes, withFrontRender };
