/**
 * Internal dependencies
 */
/**
 * External dependencies
 */
import { PanelMarginPadding } from '@yardinternet/gutenberg-editor-components';

const { Component, Fragment } = wp.element;
const { InspectorControls, URLInput, ColorPalette } = wp.editor;
const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default class Inspector extends Component {
	render() {
		const { setAttributes, attributes } = this.props;
		const { url, bgColor, elevate } = attributes;

		const elevateEnabled =
			blockSettings.card.length && // eslint-disable-line
			blockSettings.card.settings.card_elevate_enabled === 'true'; // eslint-disable-line

		return (
			<Fragment>
				<InspectorControls key="controls">
					<PanelBody
						title={ __( 'Instellingen' ) }
						initialOpen={ false }
					>
						<p className="components-base-control__label">
							{ __( 'Kaart volledig klikbaar met link' ) }
						</p>
						<URLInput
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<p className="components-base-control__label">
							{ ' ' }
							{ __( 'Achtergrondkleur' ) }
						</p>
						<ColorPalette
							value={ bgColor }
							onChange={ ( color ) =>
								setAttributes( { bgColor: color } )
							}
						/>
						{ elevateEnabled && (
							<ToggleControl
								label={ __( 'Zwevend' ) }
								checked={ elevate }
								onChange={ ( checked ) =>
									setAttributes( { elevate: checked } )
								}
							/>
						) }
					</PanelBody>
					<PanelMarginPadding
						{ ...{ setAttributes, ...attributes } }
					/>
				</InspectorControls>
			</Fragment>
		);
	}
}
