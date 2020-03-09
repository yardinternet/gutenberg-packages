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
import TextAreaControlFocusOutside from './textareacontrol-focus-outside';
import TextControlFocusOutside from './textcontrol-focus-outside';

/**
 * External dependencies
 */
import Select from 'react-select';
import { isEmpty } from 'lodash';

function MarkerModalCPT( {
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
	options = [],
	posts = [],
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

	const handleSelectChange = ( valuesFromSelect ) => {
		if ( ! valuesFromSelect ) {
			return false;
		}

		let correnspondingPost = {};

		posts.map( function( post ) {
			if ( post.title.rendered === valuesFromSelect.value ) {
				correnspondingPost = post;
			}

			return true;
		} );

		if ( ! isEmpty( correnspondingPost ) ) {
			setMarker( {
				latLng: {
					lat: Number( correnspondingPost.latitude ),
					lng: Number( correnspondingPost.longitude ),
				},
				name: correnspondingPost.title.rendered,
				infowindowURL: marker.infowindowURL,
				infowindowTargetURL: targetURL,
				infowindow: marker.infowindow,
			} );
		}
	};

	return (
		<Modal title={ title } onRequestClose={ onRequestClose }>
			<PanelRow>
				<Select
					placeholder={ __( "Kies CPT's", config.textDomain ) }
					isMulti={ false }
					noOptionsMessage={ __(
						"Geen CPT's beschikbaar",
						config.textDomain
					) }
					options={ options }
					onChange={ handleSelectChange }
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
				<Button isPrimary onClick={ () => onClick() }>
					Opslaan
				</Button>
			</PanelRow>
		</Modal>
	);
}

export default MarkerModalCPT;
