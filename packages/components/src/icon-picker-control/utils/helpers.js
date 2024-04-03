/**
 * Create a classname based on the response from the FontAwesome API with only the allowed familyStyles
 *
 * @param {Object} response            - The response from the Font Awesome API.
 * @param {Array}  allowedFamilyStyles - The allowed family styles
 */
export const convertResponseToClassnames = (
	response,
	allowedFamilyStyles
) => {
	const allFamilyStyles = getAllFamilyStyles( response );

	return allFamilyStyles
		.filter( ( familyStyle ) =>
			checkIfFamilyStyleIsAllowed( familyStyle, allowedFamilyStyles )
		)
		.map(
			( familyStyle ) =>
				`fa-${ familyStyle.family } fa-${ familyStyle.style } fa-${ response.id }`
		);
};

/**
 * Returns one array with the allowed free and pro familyStyles
 *
 * @param {Object} response - The response from the Font Awesome API.
 */
const getAllFamilyStyles = ( response ) => {
	const freeFamilyStyles = response.familyStylesByLicense.free;
	const proFamilyStyles = response.familyStylesByLicense.pro;
	const allFamilyStyles = freeFamilyStyles.concat( proFamilyStyles );

	// Remove duplicated familyStyles
	return allFamilyStyles.filter(
		( obj, index ) =>
			allFamilyStyles.findIndex(
				( item ) =>
					item.family === obj.family && item.style === obj.style
			) === index
	);
};

/**
 * Check if the current familyStyle exist in allowedFamilyStyles
 *
 * @param {Object} familyStyle         - The familyStyle to check if it's allowed.
 * @param {Array}  allowedFamilyStyles - The allowed family styles
 */
const checkIfFamilyStyleIsAllowed = ( familyStyle, allowedFamilyStyles ) => {
	return allowedFamilyStyles.some(
		( obj ) =>
			obj.family === familyStyle.family && obj.style === familyStyle.style
	);
};
