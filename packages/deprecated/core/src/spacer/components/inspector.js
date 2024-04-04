/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( props ) {
	const { setAttributes, attributes } = props;
	const { backgroundColor } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Achtergrond' ) }>
				<ColorPalette
					value={ backgroundColor }
					onChange={ ( newColor ) =>
						setAttributes( { backgroundColor: newColor } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
