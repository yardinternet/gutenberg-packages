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
		{ label: __( 'Rond' ), value: 'circle' },
		{ label: __( 'Vierkant' ), value: 'square' },
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) } initialOpen={ false }>
				<SelectControl
					label={ __( 'Stijl' ) }
					value={ type }
					options={ options }
					onChange={ ( value ) => {
						setAttributes( { type: value } );
					} }
				/>
				<SelectControl
					label={ __( 'Grootte' ) }
					value={ size }
					options={ fontawesomeSizes }
					onChange={ ( value ) => {
						setAttributes( { size: value } );
					} }
				/>
				<p className="yard-label">{ __( 'Achtergrondkleur' ) }</p>
				<ColorPalette
					value={ bgColor }
					onChange={ ( newColor ) =>
						setAttributes( { bgColor: newColor } )
					}
				/>
				<p className="yard-label">{ __( 'Kleur' ) }</p>
				<ColorPalette
					value={ color }
					onChange={ ( newColor ) =>
						setAttributes( { color: newColor } )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Iconen' ) }>
				<CheckboxControl
					label={ __( 'Toon Twitter' ) }
					checked={ twitter }
					onChange={ ( isChecked ) => {
						setAttributes( { twitter: isChecked } );
					} }
				/>
				<CheckboxControl
					label={ __( 'Toon Facebook' ) }
					checked={ facebook }
					onChange={ ( isChecked ) => {
						setAttributes( { facebook: isChecked } );
					} }
				/>
				<CheckboxControl
					label={ __( 'Toon LinkedIn' ) }
					checked={ linkedin }
					onChange={ ( isChecked ) => {
						setAttributes( { linkedin: isChecked } );
					} }
				/>
				<CheckboxControl
					label={ __( 'Toon WhatsApp' ) }
					checked={ whatsapp }
					onChange={ ( isChecked ) => {
						setAttributes( { whatsapp: isChecked } );
					} }
				/>
				<CheckboxControl
					label={ __( 'Toon print' ) }
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
