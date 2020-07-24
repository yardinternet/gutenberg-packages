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
