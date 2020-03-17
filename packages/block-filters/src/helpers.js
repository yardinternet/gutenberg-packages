/**
 *
 * @param {{blockFilters: Array, config: Object}} obj
 * @return {Array} returns registered blockFilters
 */
export function registerBlockFilters( { blockFilters = [], config = {} } ) {
	return blockFilters.filter( ( blockFilter ) => {
		if (
			config[ blockFilter.name ] &&
			typeof blockFilter.register === 'function'
		) {
			blockFilter.register();
			return true;
		}

		return false;
	} );
}
