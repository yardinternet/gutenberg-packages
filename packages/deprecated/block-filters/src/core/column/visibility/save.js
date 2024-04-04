/**
 * Add a class to the column block if hideColumn is true.
 *
 * @param {Object} props      - The props passed to the block.
 * @param {Object} blockType  - The block type.
 * @param {Object} attributes - The block attributes.
 */
const addVisibilityClassToSave = ( props, blockType, attributes ) => {
	if ( blockType.name !== 'core/column' ) {
		return props;
	}
	const { className } = props;

	if ( attributes.hideColumn ) {
		return Object.assign( props, {
			className: className + ' is-hidden',
		} );
	}

	return props;
};

export default addVisibilityClassToSave;
