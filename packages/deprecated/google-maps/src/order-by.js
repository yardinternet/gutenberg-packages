const rank = ( value ) => {
	if ( value === undefined ) {
		return 2;
	}
	return value === null ? 1 : 0;
};

/**
 * Stable ascending sort on one or more keys, ordered like lodash orderBy: null after values, undefined last.
 *
 * @param {Array}    items
 * @param {string[]} keys
 * @return {Array} sorted copy
 */
export const orderBy = ( items = [], keys = [] ) =>
	[ ...( items || [] ) ].sort( ( a, b ) => {
		for ( const key of keys ) {
			const x = a?.[ key ];
			const y = b?.[ key ];
			const byRank = rank( x ) - rank( y );

			if ( byRank ) {
				return byRank;
			}
			if ( x < y ) {
				return -1;
			}
			if ( x > y ) {
				return 1;
			}
		}
		return 0;
	} );
