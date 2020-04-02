/**
 * Populate select from getMedia redux selector
 *
 * @param {Object} sizes
 * @param {Array} labels
 * @return {Object} key/pair
 */
export function populateSelectFromMediaSizes( sizes = {}, labels = [] ) {
	const getLabel = ( needle ) => {
		const result = labels.find( ( label ) => label.slug === needle );
		return result ? result.name : needle;
	};

	return Object.keys( sizes ).map( ( item ) => {
		return {
			label: getLabel( item ),
			value: sizes[ item ].source_url,
		};
	} );
}

/**
 * Finds imageSize by given url and the sizes object
 *
 * @param {string} url
 * @param {Object} sizes
 * @return {string} url
 */
export function getImageSizeByUrl( url = '', sizes = {} ) {
	const result = Object.keys( sizes ).find(
		( size ) => sizes[ size ].source_url === url
	);

	return result ? sizes[ result ].source_url : '';
}
