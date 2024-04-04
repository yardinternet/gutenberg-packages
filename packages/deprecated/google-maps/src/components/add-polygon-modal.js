/**
 * WordPress dependencies
 */
import { Modal, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { config } from '../config';

function AddPolygonModal( props ) {
	const [ polygonName, setPolygonName ] = useState( '' );
	const { coordinates, onSubmit, onRequestClose } = props;

	return (
		<Modal
			title={ __( 'Polygon toevoegen', config.textDomain ) }
			onRequestClose={ onRequestClose }
		>
			<TextControl
				onChange={ ( val ) => setPolygonName( val ) }
				label="Naam"
			/>
			<Button
				onClick={ () => onSubmit( polygonName, coordinates ) }
				isSecondary
			>
				{ __( 'Opslaan', config.textDomain ) }
			</Button>
		</Modal>
	);
}

export default AddPolygonModal;
