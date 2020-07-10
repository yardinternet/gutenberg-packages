/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Button, Modal, PanelRow, ToggleControl } from '@wordpress/components';

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
		infowindowTitle: '',
		infowindowURL: '',
		infowindowTargetURL: false,
		infowindowPhone: '',
		infowindowEmail: '',
	},
} ) {
	const [ marker, setMarker ] = useState( markerData );

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
			<div style={ { minHeight: '300px' } }>
				<>
					<PanelRow>
						<GeocodeAutocomplete
							styles={ { width: '100%' } }
							defaultInputValue={ markerData.name }
							onChange={ ( option ) => {
								setMarker( {
									...marker,
									...{
										latLng: {
											lat: option.latLng.lat(),
											lng: option.latLng.lng(),
										},
										name: option.value,
									},
								} );
							} }
						/>
					</PanelRow>
					{ ! isEmpty( marker.name ) && (
						<>
							<PanelRow>
								<TextControlFocusOutside
									label={
										config.infowindow.fields.title.label
									}
									name={ 'infowindowTitle' }
									setMarker={ setMarker }
									marker={ marker }
								/>
							</PanelRow>
							<PanelRow>
								<TextControlFocusOutside
									label={
										config.infowindow.fields.phone.label
									}
									name={ 'infowindowPhone' }
									setMarker={ setMarker }
									marker={ marker }
								/>
							</PanelRow>
							<PanelRow>
								<TextControlFocusOutside
									label={
										config.infowindow.fields.email.label
									}
									name={ 'infowindowEmail' }
									setMarker={ setMarker }
									marker={ marker }
								/>
							</PanelRow>
							<PanelRow>
								<TextControlFocusOutside
									label={ config.infowindow.fields.url.label }
									setMarker={ setMarker }
									name={ 'infowindowURL' }
									marker={ marker }
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={
										config.infowindow.fields.urlWindow.label
									}
									checked={ marker.infowindowTargetURL }
									onChange={ ( value ) => {
										setMarker( {
											...marker,
											...{
												infowindowTargetURL: value,
											},
										} );
									} }
								/>
							</PanelRow>
							<PanelRow>
								<TextAreaControlFocusOutside
									label={
										config.infowindow.fields.content.label
									}
									name={ 'infowindow' }
									setMarker={ setMarker }
									marker={ marker }
								/>
							</PanelRow>
							<PanelRow>
								<Button
									isPrimary
									disabled={ isEmpty( marker.name ) }
									onClick={ () => onClick() }
								>
									Opslaan
								</Button>
							</PanelRow>
						</>
					) }
				</>
			</div>
		</Modal>
	);
}

export default MarkerModal;
