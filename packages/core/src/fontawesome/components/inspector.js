/**
 * Internal dependencies
 */
import sizes from '../settings/sizes';

const { Component } = wp.element;
const { SelectControl, PanelBody } = wp.components;
const { InspectorControls, ColorPalette, FontSizePicker } = wp.editor;
const { __ } = wp.i18n;

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
