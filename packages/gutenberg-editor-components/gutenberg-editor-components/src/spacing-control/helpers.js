/**
 * Filter number which is passed onto a RangeControl
 *
 * @param {string} value mt-md-5
 * @return {number} 5
 */
function filterNumber( value ) {
	if ( ! value ) {
		return 0;
	}

	const negativeMargin = getNegativeMargin( value );

	if ( negativeMargin ) {
		return formatToNegativeNumber( negativeMargin );
	}

	return parseInt( value.replace( /[\D]+/, '' ), 10 );
}

/**
 *
 * @param {string} value | mb-md-3n
 * @return {number} 3
 */
function getNegativeMargin( value ) {
	const match = /-n(\d)/.exec( value );

	return match && match[ 1 ] ? parseInt( match[ 1 ], 10 ) : 0;
}

/**
 *
 * @param {number} number 3
 * @return {number} negative number -3
 */
function formatToNegativeNumber( number ) {
	return Math.abs( number ) * -1;
}

function getMarginAttributes() {
	return {
		marginTop: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		marginRight: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		marginBottom: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		marginLeft: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
	};
}

function getPaddingAttributes() {
	return {
		paddingTop: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		paddingRight: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		paddingBottom: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
		paddingLeft: {
			type: 'object',
			default: {
				desktop: false,
				tablet: false,
				mobile: false,
			},
		},
	};
}

export {
	filterNumber,
	formatToNegativeNumber,
	getNegativeMargin,
	getMarginAttributes,
	getPaddingAttributes,
};
