/**
 * Add hideColumn attribute to the column block.
 *
 * @param {Object} settings - The block settings object.
 * @param {string} name     - The block name.
 */
const addVisibilityAttribute = ( settings, name ) => {
	if ( name !== 'core/column' ) {
		return settings;
	}

	settings.attributes = Object.assign( settings.attributes, {
		hideColumn: {
			type: 'boolean',
			default: false,
		},
	} );

	return settings;
};

export default addVisibilityAttribute;
