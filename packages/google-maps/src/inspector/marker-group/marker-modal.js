import { useState } from '@wordpress/element';
import { Button, Modal, PanelRow } from '@wordpress/components';

import GeocodeAutocomplete from '../geocode-autocomplete';

function MarkerModal( {
	title = 'Marker toevoegen',
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
		<Modal title={ title } onRequestClose={ onRequestClose }>
			<PanelRow>
				<GeocodeAutocomplete
					styles={ { width: '100%' } }
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
			</PanelRow>
			<PanelRow>
				<Button isPrimary onClick={ () => onClick() }>
					Opslaan
				</Button>
			</PanelRow>
		</Modal>
	);
}

export default MarkerModal;
