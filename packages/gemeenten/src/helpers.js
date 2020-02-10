/**
 * Extract the property name and the default value of the gutenberg block attributes
 *
 * @param {*} attributes
 */
export function extractFromBlockAttributes( attributes = {} ) {
	const newAttributes = {};

	Object.keys( attributes ).map(
		( attribute ) => ( newAttributes[ attribute ] = attributes[ attribute ].default )
	);

	return newAttributes;
}
