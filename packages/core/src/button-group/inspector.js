/**
 * External dependencies
 */
import { FlexboxControl } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { Button, ButtonGroup, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const flexOptions = [
	{ value: 'flex-align-center-left', label: __( 'Links' ) },
	{ value: 'flex-align-center-center', label: __( 'Midden' ) },
	{ value: 'flex-align-center-right', label: __( 'Rechts' ) },
];

const btnOptions = [
	{ key: 'auto', value: 'auto' },
	{ key: 'fullwidth', value: 'volledig' },
];

function Inspector( { attributes, setAttributes } ) {
	const { btnWidth, btnAlignment } = attributes;

	const onChangeBtnAlignment = ( alignment ) => {
		setAttributes( {
			btnAlignment: alignment,
		} );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<p className="yard-label">{ __( 'Button breedte' ) }</p>
				<ButtonGroup>
					{ btnOptions.map( ( { key, value } ) => (
						<Button
							onClick={ () => setAttributes( { btnWidth: key } ) }
							key={ key }
							isDefault={ key !== btnWidth }
							isPrimary={ key === btnWidth }
						>
							{ value }
						</Button>
					) ) }
				</ButtonGroup>
			</PanelBody>
			<FlexboxControl
				panelLabel={ __( 'Uitlijning' ) }
				options={ flexOptions }
				onClick={ ( value ) => onChangeBtnAlignment( value ) }
				styleOptions={ { height: '45px' } }
				value={ btnAlignment }
			/>
		</InspectorControls>
	);
}

export default Inspector;
