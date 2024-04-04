/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	FontSizePicker,
	ColorPalette,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { IconPickerControl } from '@yardinternet/gutenberg-editor-components';

function Inspector( props ) {
	const { setAttributes, attributes } = props;
	const { iconSize, iconColor, icon, altText } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Keuze opties' ) }>
				<IconPickerControl
					icon={ icon }
					onChange={ ( result ) =>
						setAttributes( {
							icon: result,
						} )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Icooninstellingen' ) }>
				<FontSizePicker
					value={ iconSize }
					onChange={ ( size ) => setAttributes( { iconSize: size } ) }
				/>
				<ColorPalette
					value={ iconColor }
					onChange={ ( newColor ) =>
						setAttributes( { iconColor: newColor } )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Toegankelijkheid' ) } initialOpen={ false }>
				<TextControl
					label={ __( 'Alternatieve tekst' ) }
					value={ altText }
					onChange={ ( value ) =>
						setAttributes( {
							altText: value,
						} )
					}
					help={ __(
						'Voeg een alternatieve tekst toe als een icoon betekenis heeft.'
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
