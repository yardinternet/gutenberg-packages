/**
 * Validate the URL pattern
 *
 * @param {*} value
 */
async function validPatternURL( value ) {
	try {
		new URL( '/', value );
	} catch ( error ) {
		return false;
	}

	return true;
}

/**
 * Validate the URL based on the http response
 *
 * @param {string} value
 */
async function validateURL( value ) {
	const patternURLValid = validPatternURL( value );
	try {
		if ( ! patternURLValid ) {
			throw 'URL is not valid';
		}

		const response = await fetch( value );

		if ( response.status === 200 || response.status === 201 ) {
			return value;
		}

		throw 'URL is not valid';
	} catch ( e ) {
		return '';
	}
}

/**
 * Check if values have a length
 *
 * @param {Array} input
 */
function hasLength( input = [] ) {
	const inputLength = input.length;

	const newArr = input.filter( ( item ) => !! item.length );

	const newArrLength = newArr.length;

	if ( inputLength !== newArrLength ) {
		return false;
	}

	return true;
}

export { validateURL, hasLength };
