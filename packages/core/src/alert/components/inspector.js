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
		{ label: 'primair', value: 'alert alert-primary' },
		{ label: 'secundair', value: 'alert alert-secondary' },
		{ label: 'succes', value: 'alert alert-success' },
		{ label: 'gevaar', value: 'alert alert-danger' },
		{ label: 'waarschuwing', value: 'alert alert-warning' },
		{ label: 'info', value: 'alert alert-info' },
		{ label: 'licht', value: 'alert alert-light' },
		{ label: 'donker', value: 'alert alert-dark' },
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
