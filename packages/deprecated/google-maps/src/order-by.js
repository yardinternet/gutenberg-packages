const compare = ( x = '', y = '' ) => ( x > y ) - ( x < y );

/**
 * Ascending sort on one or more keys.
 *
 * @param {Array}    items
 * @param {string[]} keys
 * @return {Array} sorted copy
 */
export const orderBy = ( items, keys = [] ) =>
	[ ...( items || [] ) ].sort(
		( a, b ) =>
			keys
				.map( ( key ) => compare( a?.[ key ], b?.[ key ] ) )
				.find( Boolean ) || 0
	);
