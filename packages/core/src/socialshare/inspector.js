/**
 * WordPress dependencies
 */
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import {
	PanelBody,
	CheckboxControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import fontawesomeSizes from './settings/sizes';

function SocialShare( { attributes, setAttributes } ) {
	const {
		type,
		bgColor,
		color,
		size,
		twitter,
		facebook,
		linkedin,
		whatsapp,
		print,
	} = attributes;
	const options = [
		{ label: 'Rond', value: 'circle' },
		{ label: 'Vierkant', value: 'square' },
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) } initialOpen={ false }>
				<SelectControl
					label={ __( 'Style' ) }
					value={ type }
					options={ options }
					onChange={ ( value ) => {
						setAttributes( { type: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Size' ) }
					value={ size }
					options={ fontawesomeSizes }
					onChange={ ( value ) => {
						setAttributes( { size: value } );
					} }
				/>
				<p className="yard-label">Achtergrondkleur</p>
				<ColorPalette
					value={ bgColor }
					onChange={ ( newColor ) =>
						setAttributes( { bgColor: newColor } )
					}
				/>
				<p className="yard-label">Kleur</p>
				<ColorPalette
					value={ color }
					onChange={ ( newColor ) =>
						setAttributes( { color: newColor } )
					}
				/>
			</PanelBody>
			<PanelBody title="Iconen">
				<CheckboxControl
					label="Toon Twitter"
					checked={ twitter }
					onChange={ ( isChecked ) => {
						setAttributes( { twitter: isChecked } );
					} }
				/>
				<CheckboxControl
					label="Toon Facebook"
					checked={ facebook }
					onChange={ ( isChecked ) => {
						setAttributes( { facebook: isChecked } );
					} }
				/>
				<CheckboxControl
					label="Toon Linkedin"
					checked={ linkedin }
					onChange={ ( isChecked ) => {
						setAttributes( { linkedin: isChecked } );
					} }
				/>
				<CheckboxControl
					label="Toon whatsapp"
					checked={ whatsapp }
					onChange={ ( isChecked ) => {
						setAttributes( { whatsapp: isChecked } );
					} }
				/>
				<CheckboxControl
					label="Toon print"
					checked={ print }
					onChange={ ( isChecked ) => {
						setAttributes( { print: isChecked } );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default SocialShare;
