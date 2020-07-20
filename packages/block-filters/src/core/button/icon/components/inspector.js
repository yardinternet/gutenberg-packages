/**
 * WordPress dependencies
 */
/**
 * External dependencies
 */
import { IconPickerControl } from '@yardinternet/gutenberg-editor-components';
import { PanelBody, ToggleControl, Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const {
		yardShowButtonIcon,
		yardButtonIcon,
		yardButtonIconColor,
	} = attributes;
	const [ isOpen, setOpen ] = useState( false );

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Icoon instellingen' ) }>
				<ToggleControl
					label={ __( 'Toon icoon' ) }
					checked={ yardShowButtonIcon }
					onChange={ ( bool ) =>
						setAttributes( {
							yardShowButtonIcon: bool,
						} )
					}
				/>
				{ yardShowButtonIcon && (
					<>
						<Button isDefault onClick={ () => setOpen( true ) }>
							{ __( 'Kies een icoon' ) }
						</Button>
						<ColorPalette
							value={ yardButtonIconColor }
							onChange={ ( value ) =>
								setAttributes( { yardButtonIconColor: value } )
							}
						/>
					</>
				) }
				{ isOpen && (
					<Modal
						title={ __( 'Kies een icoon' ) }
						onRequestClose={ () => setOpen( false ) }
					>
						<IconPickerControl
							icon={ yardButtonIcon }
							onChange={ ( value ) =>
								setAttributes( {
									yardButtonIcon: value,
								} )
							}
						/>
						<Button isDefault onClick={ () => setOpen( false ) }>
							{ __( 'Sluit' ) }
						</Button>
					</Modal>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
