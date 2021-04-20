/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	ColorPalette,
	FontSizePicker,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { SelectControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import sizes from '../settings/sizes';
export default class Inspector extends Component {
	render() {
		const { setAttributes, attributes } = this.props;
		const {
			size,
			color,
			descriptionColor,
			descriptionFontSize,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Icoon' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Formaat' ) }
						value={ size }
						options={ sizes }
						onChange={ ( value ) => {
							setAttributes( { size: value } );
						} }
					/>
					<p className="yard-label">{ __( 'Kleur' ) }</p>
					<ColorPalette
						value={ color }
						onChange={ ( newColor ) =>
							setAttributes( { color: newColor } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Tekst' ) } initialOpen={ false }>
					<p className="yard-label">{ __( 'Kleur' ) }</p>
					<ColorPalette
						value={ descriptionColor }
						onChange={ ( newColor ) =>
							setAttributes( { descriptionColor: newColor } )
						}
					/>
					<FontSizePicker
						fallbackFontSize={ 16 }
						value={ descriptionFontSize }
						onChange={ ( newFontSize ) => {
							setAttributes( {
								descriptionFontSize: newFontSize,
							} );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
