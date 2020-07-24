/**
 * External dependencies
 */
import {
	BackgroundImageControl,
	PanelMarginPadding,
} from '@yardinternet/gutenberg-editor-components';

const { Component, Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const {
	PanelBody,
	SelectControl,
	CheckboxControl,
	ToggleControl,
} = wp.components;
const { __ } = wp.i18n;

export default class Inspector extends Component {
	render() {
		const { setAttributes, attributes } = this.props;
		const {
			isFlex,
			flexDirection,
			alignItems,
			justifyContent,
			bgColor,
			isHidden,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls key="controls">
					<PanelBody title={ __( 'Layout' ) } initialOpen={ false }>
						<CheckboxControl
							label={ __( 'Is flex' ) }
							help={ __(
								'Voegt de property flex toe wanneer deze is aangevinkt, wanneer deze staat uitgevinkt wordt de property block toevoegd'
							) }
							checked={ isFlex }
							onChange={ ( isChecked ) => {
								setAttributes( { isFlex: isChecked } );
							} }
						/>
						{ isFlex && (
							<Fragment>
								<SelectControl
									label={ __( 'Direction' ) }
									value={ flexDirection }
									options={ [
										{
											label: __( 'Column' ),
											value: 'flex-direction-column',
										},
										{
											label: __( 'Row' ),
											value: 'flex-direction-row',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											flexDirection: value,
										} );
									} }
								/>
								<SelectControl
									label={ __( 'Align content' ) }
									value={ alignItems }
									options={ [
										{
											label: __( 'Start' ),
											value: 'align-items-start',
										},
										{
											label: __( 'Center' ),
											value: 'align-items-center',
										},
										{
											label: __( 'End' ),
											value: 'align-items-end',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( { alignItems: value } );
									} }
								/>
								<SelectControl
									label={ __( 'Justify content' ) }
									value={ justifyContent }
									options={ [
										{
											label: __( 'Start' ),
											value: 'justify-content-start',
										},
										{
											label: __( 'Center' ),
											value: 'justify-content-center',
										},
										{
											label: __( 'End' ),
											value: 'justify-content-end',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											justifyContent: value,
										} );
									} }
								/>
							</Fragment>
						) }
					</PanelBody>
					<PanelBody title={ __( 'Opties' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Kolom verbergen' ) }
							checked={ isHidden }
							help={ __(
								'Verbergt de kolom aan de voorkant van de website. In de editor blijft de kolom zichtbaar'
							) }
							onChange={ ( bool ) =>
								setAttributes( { isHidden: bool } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Background' ) }
						initialOpen={ false }
					>
						<BackgroundImageControl
							{ ...{ setAttributes, attributes } }
						/>
						<p className="yard-label">
							{ __( 'Background color' ) }
						</p>
						<ColorPalette
							value={ bgColor }
							onChange={ ( color ) =>
								setAttributes( { bgColor: color } )
							}
						/>
					</PanelBody>
					<PanelMarginPadding
						{ ...{ setAttributes, ...attributes } }
					/>
				</InspectorControls>
			</Fragment>
		);
	}
}
