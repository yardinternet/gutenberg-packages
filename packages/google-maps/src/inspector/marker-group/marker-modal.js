/**
 * Wordpress dependencies
 */
import { useState } from '@wordpress/element';
import { Button, Modal, PanelRow, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { config } from '../../config';
import GeocodeAutocomplete from '../geocode-autocomplete';
import TextAreaControlFocusOutside from './textareacontrol-focus-outside';
import TextControlFocusOutside from './textcontrol-focus-outside';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

function MarkerModal( {
	title = 'Marker toevoegen',
	onSubmit = () => {},
	onRequestClose = () => {},
	markerData = {
		latLng: false,
		name: '',
		indexVal: null,
		infowindow: '',
		infowindowURL: '',
		infowindowTargetURL: false,
	},
} ) {
	const [ marker, setMarker ] = useState( markerData );
	const [ targetURL, setTargetURL ] = useState(
		markerData.infowindowTargetURL
	);

	const onClick = () => {
		setMarker( {} );
		onSubmit( marker, markerData.indexVal );
		onRequestClose();
	};

	const closeModal = () => {
		setMarker( {} );
		onRequestClose();
	};

	return (
		<Modal title={ title } onRequestClose={ closeModal }>
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
							infowindowURL: marker.infowindowURL,
							infowindowTargetURL: targetURL,
							infowindow: marker.infowindow,
						} );
						return option.value;
					} }
				/>
			</PanelRow>
			<PanelRow>
				<TextControlFocusOutside
					label={ __(
						'URL voor in het informatievenster. Voorbeeld: https://www.domein.nl',
						config.textDomain
					) }
					targetURL={ targetURL }
					setMarker={ setMarker }
					marker={ marker }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __(
						'Link op andere pagina openen?',
						config.textDomain
					) }
					checked={ targetURL }
					onChange={ ( value ) => {
						setTargetURL( value );
						setMarker( {
							latLng: marker.latLng,
							name: marker.name,
							infowindowURL: marker.infowindowURL,
							infowindowTargetURL: value,
							infowindow: marker.infowindow,
						} );
					} }
				/>
			</PanelRow>
			<PanelRow>
				<TextAreaControlFocusOutside
					label={ __(
						'Beschrijving voor in het informatievenster',
						config.textDomain
					) }
					targetURL={ targetURL }
					setMarker={ setMarker }
					marker={ marker }
				/>
			</PanelRow>
			<PanelRow>
				<Button
					isPrimary
					disabled={ isEmpty( marker.name ) ? true : false }
					onClick={ () => onClick() }
				>
					Opslaan
				</Button>
			</PanelRow>
		</Modal>
	);
}

export default MarkerModal;
