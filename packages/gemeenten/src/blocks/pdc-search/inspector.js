/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<TextControl
					label={ __( 'Input label' ) }
					value={ attributes.label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<TextControl
					label={ __( 'Zoek URL' ) }
					type="url"
					value={ attributes.searchUrl }
					onChange={ ( url ) => setAttributes( { searchUrl: url } ) }
				/>
				<CheckboxControl
					label={ __( 'Tekst in plaats van icoon' ) }
					value={ attributes.hasBtnText }
					onChange={ ( checked ) =>
						setAttributes( { hasBtnText: checked } )
					}
				/>
				{ attributes.hasBtnText && (
					<TextControl
						label={ __( 'Knop label' ) }
						value={ attributes.btnText }
						onChange={ ( value ) =>
							setAttributes( { btnText: value } )
						}
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
