/**
 * External dependencies
 */
import {
	BackgroundControl,
	SpacingControl,
	FlexboxControl,
	SizeControl,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ToggleControlContainerPadding from './components/toggle-control-container-padding';

function Inspector( { attributes, setAttributes } ) {
	const {
		minHeight,
		rowGutter,
		columnsEqualHeight,
		flexAlignment,
		fullWidth,
		isInnerContainerFluid,
		hasContainerPadding,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) } initialOpen={ false }>
				<ToggleControlContainerPadding
					{ ...{ hasContainerPadding, setAttributes } }
				/>
				<ToggleControl
					label={ __( 'Verberg ruimte tussen kolommen' ) }
					checked={ rowGutter }
					onChange={ ( bool ) =>
						setAttributes( { rowGutter: bool } )
					}
				/>
				<ToggleControl
					label={ __( 'Kolommen gelijke hoogte' ) }
					checked={ columnsEqualHeight }
					onChange={ ( bool ) =>
						setAttributes( { columnsEqualHeight: bool } )
					}
				/>
				{ fullWidth && (
					<ToggleControl
						label={ __( 'Kolommen volledige breedte' ) }
						checked={ isInnerContainerFluid }
						onChange={ ( bool ) =>
							setAttributes( { isInnerContainerFluid: bool } )
						}
					/>
				) }
			</PanelBody>
			<PanelBody title={ __( 'Hoogte' ) } initialOpen={ false }>
				<SizeControl
					{ ...{ setAttributes } }
					value={ minHeight }
					onChange={ ( val ) => setAttributes( { minHeight: val } ) }
					label={ __( 'Minimale hoogte' ) }
				/>
			</PanelBody>
			<FlexboxControl
				value={ flexAlignment }
				panelLabel={ __( 'Uitlijning' ) }
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
				<BackgroundControl { ...{ setAttributes, attributes } } />
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
