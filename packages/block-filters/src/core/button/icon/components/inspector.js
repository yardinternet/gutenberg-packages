/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { IconPickerControl } from '@yardinternet/gutenberg-editor-components';

function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const {
		yardShowButtonIcon,
		yardButtonIcon,
		yardButtonIconColor,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Icoon instellingen' ) }>
				<ToggleControl
					label={ __( 'Toon icoon' ) }
					checked={ yardShowButtonIcon }
					onChange={ ( bool ) =>
						setAttributes( {
							yardShowButtonIcon: bool,
						} )
					}
				/>
				{ yardShowButtonIcon && (
					<>
						<ColorPalette
							value={ yardButtonIconColor }
							onChange={ ( value ) =>
								setAttributes( {
									yardButtonIconColor: value,
								} )
							}
						/>
						<IconPickerControl
							icon={ yardButtonIcon }
							onChange={ ( result ) =>
								setAttributes( {
									yardButtonIcon: result,
								} )
							}
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
