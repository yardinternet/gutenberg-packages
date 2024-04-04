/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// TODO add feature flag

function ToggleControlContainerPadding( {
	hasContainerPadding,
	setAttributes,
} ) {
	return (
		<ToggleControl
			label={ __( 'Container padding' ) }
			checked={ hasContainerPadding }
			onChange={ ( bool ) =>
				setAttributes( { hasContainerPadding: bool } )
			}
		/>
	);
}

export default ToggleControlContainerPadding;
