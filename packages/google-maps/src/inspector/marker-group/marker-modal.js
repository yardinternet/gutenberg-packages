import { useState } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';

import GeocodeAutocomplete from '../geocode-autocomplete';

function MarkerModal( {
	onSubmit = () => {},
	onRequestClose = () => {},
	markerData = {
		latLng: false,
		name: '',
		indexVal: null,
	},
} ) {
	const [ marker, setMarker ] = useState( markerData );

	const onClick = () => {
		setMarker( {} );
		onSubmit( marker, markerData.indexVal );
		onRequestClose();
	};

	return (
		<Modal onRequestClose={ onRequestClose }>
			<GeocodeAutocomplete
				defaultInputValue={ markerData.name }
				onChange={ ( option ) => {
					setMarker( {
						latLng: {
							lat: option.latLng.lat(),
							lng: option.latLng.lng(),
						},
						name: option.value,
					} );
					return option.value;
				} }
			/>
			<Button onClick={ () => onClick() }>Opslaan</Button>
		</Modal>
	);
}

export default MarkerModal;
