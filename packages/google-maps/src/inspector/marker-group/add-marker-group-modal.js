import { Modal, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

function AddMarkerGroupModal( {
	onSubmit = () => {},
	onRequestClose = () => {},
} ) {
	const [ groupName, setGroupName ] = useState( '' );

	return (
		<Modal
			title={ __( 'Markergroep toevoegen', 'DOMAIN' ) }
			onRequestClose={ onRequestClose }
		>
			<TextControl
				onChange={ ( val ) => setGroupName( val ) }
				label="Naam"
			/>
			<Button isPrimary onClick={ () => onSubmit( groupName ) } isDefault>
				{ __( 'Opslaan', 'DOMAIN' ) }
			</Button>
		</Modal>
	);
}

export default AddMarkerGroupModal;
