/**
 * WordPress dependencies
 */
import { InspectorControls, FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { IconPickerControl } from '@yardinternet/gutenberg-editor-components';

const Inspector = ( props ) => {
	const { setAttributes, attributes } = props;
	const { iconSize, icon, altText } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Kies een icoon' ) }>
				<IconPickerControl
					icon={ icon }
					onChange={ ( result ) =>
						setAttributes( {
							icon: result,
						} )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Grootte' ) }>
				<FontSizePicker
					label="Grootte"
					value={ iconSize }
					onChange={ ( size ) => setAttributes( { iconSize: size } ) }
					withReset={ true }
					withSlider={ true }
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
};

export default Inspector;
