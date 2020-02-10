/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( { attributes, setAttributes } ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<TextControl
					label={ __( 'Label' ) }
					value={ attributes.label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<TextControl
					label={ __( 'Zoek url' ) }
					type="url"
					value={ attributes.searchUrl }
					onChange={ ( url ) => setAttributes( { searchUrl: url } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
