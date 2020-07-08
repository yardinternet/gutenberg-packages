/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( {
	showOpen = false,
	setShowOpen = () => {},
	isAccordion = true,
	setIsAccordion = () => {},
} ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<ToggleControl
					label={ __( 'Toon standaard open' ) }
					checked={ showOpen }
					onChange={ setShowOpen }
				/>
				<ToggleControl
					label={ __( 'Sluit na klik op ander item' ) }
					checked={ isAccordion }
					onChange={ setIsAccordion }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
