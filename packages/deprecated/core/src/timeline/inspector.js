/**
 * External dependencies
 */
import {
	FlexboxControl,
	SpacingControl,
	BackgroundImageControl,
	SizeControl,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( { attributes, setAttributes } ) {
	const { bgColor, minHeight, flexAlignment } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Hoogte' ) } initialOpen={ false }>
				<SizeControl
					{ ...{ setAttributes } }
					value={ minHeight }
					onChange={ ( val ) => setAttributes( { minHeight: val } ) }
					label="Min-height"
				/>
			</PanelBody>
			<FlexboxControl
				value={ flexAlignment }
				panelLabel={ 'Uitlijning' }
				onClick={ ( val ) => {
					setAttributes( { flexAlignment: val } );
				} }
			/>
			<SpacingControl
				{ ...{ attributes, setAttributes } }
				panelLabel={ 'Margin' }
				type={ 'margin' }
			/>
			<SpacingControl
				{ ...{ attributes, setAttributes } }
				panelLabel={ 'Padding' }
				type={ 'padding' }
			/>
			<PanelBody title={ __( 'Achtergrond' ) } initialOpen={ false }>
				<BackgroundImageControl { ...{ setAttributes, attributes } } />
				<p className={ 'yard-label' }>{ __( 'Achtergrond kleur' ) }</p>
				<ColorPalette
					value={ bgColor }
					onChange={ ( color ) =>
						setAttributes( { bgColor: color } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
