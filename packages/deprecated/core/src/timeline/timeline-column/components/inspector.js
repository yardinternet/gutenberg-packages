/**
 * External dependencies
 */
import { BackgroundImageControl } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { ColorPicker, PanelBody, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( { attributes, setAttributes, buildGradientArray } ) {
	const { timelineColor, isHidden } = attributes;

	useEffect( () => {
		onChangeColor( timelineColor );
	}, [] );

	function onChangeVisibility( isChecked ) {
		setAttributes( { isHidden: isChecked } );

		buildGradientArray();
	}

	function onChangeColor( hexValue ) {
		// Set the color for the column (used to display a line and circle per timeline step)
		setAttributes( { timelineColor: hexValue } );

		buildGradientArray();
	}

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<CheckboxControl
					label={ __( 'Verbergen in de tijdlijn' ) }
					checked={ isHidden }
					onChange={ ( isChecked ) =>
						onChangeVisibility( isChecked )
					}
				/>
				<p className={ 'yard-label' }>{ __( 'Kleur' ) }</p>
				<ColorPicker
					color={ timelineColor }
					onChangeComplete={ ( color ) => onChangeColor( color.hex ) }
					disableAlpha
				/>
			</PanelBody>
			<PanelBody title={ __( 'Icoon' ) } initialOpen={ false }>
				<BackgroundImageControl
					{ ...{ setAttributes, attributes } }
					hideControls
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
