/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

function Inspector( props ) {
	const { setAttributes, attributes } = props;
	const { alertType } = attributes;

	const PRESET_ALERT_CLASSES = [
		{ label: __( 'Primair' ), value: 'alert alert-primary' },
		{ label: __( 'Secundair' ), value: 'alert alert-secondary' },
		{ label: __( 'Succes' ), value: 'alert alert-success' },
		{ label: __( 'Gevaar' ), value: 'alert alert-danger' },
		{ label: __( 'Waarschuwing' ), value: 'alert alert-warning' },
		{ label: __( 'Info' ), value: 'alert alert-info' },
		{ label: __( 'Licht' ), value: 'alert alert-light' },
		{ label: __( 'Donker' ), value: 'alert alert-dark' },
	];

	const alertClasses = applyFilters(
		'yard-blocks.alertClasses',
		PRESET_ALERT_CLASSES
	);

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<SelectControl
					label={ __( 'Kies stijl' ) }
					value={ alertType }
					options={ alertClasses }
					onChange={ ( value ) => {
						setAttributes( { alertType: value } );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
