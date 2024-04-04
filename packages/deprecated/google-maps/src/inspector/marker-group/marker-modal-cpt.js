/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import {
	Button,
	Modal,
	PanelRow,
	ToggleControl,
	Spinner,
} from '@wordpress/components';
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
	modalTitle = __( 'CPT Marker toevoegen', config.textDomain ),
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
	loadingPosts = false,
} ) {
	const [ marker, setMarker ] = useState( markerData );
	const [ error, setError ] = useState( false );
	const [ targetURL, setTargetURL ] = useState(
		markerData.infowindowTargetURL
	);

	const onClick = () => {
		onSubmit( marker, markerData.indexVal );
		setMarker( {} );
		onRequestClose();
	};

	const closeModal = () => {
		setMarker( {} );
		onRequestClose();
	};

	const handleSelectChange = ( valuesFromSelect ) => {
		if ( ! valuesFromSelect ) {
			return false;
		}

		const correnspondingPost = posts.find(
			( { title } ) => title.rendered === valuesFromSelect.value
		);

		if ( isEmpty( correnspondingPost ) ) {
			setError( true );
			return false;
		}

		setError( false );

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
	};

	return (
		<Modal title={ modalTitle } onRequestClose={ closeModal }>
			<div style={ { minHeight: '300px' } }>
				<PanelRow>
					{ loadingPosts && <Spinner /> }
					{ ! loadingPosts && (
						<div style={ { width: '100%' } }>
							<Select
								style={ { width: '100%' } }
								placeholder={ __(
									"Kies CPT's",
									config.textDomain
								) }
								isMulti={ false }
								noOptionsMessage={ __(
									"Geen CPT's beschikbaar",
									config.textDomain
								) }
								options={ options }
								onChange={ handleSelectChange }
							/>
							{ error && (
								<p style={ { color: 'red' } }>
									{ __(
										'Er gaat iets fout, probeer het nog een keer.',
										config.textDomain
									) }
								</p>
							) }
						</div>
					) }
				</PanelRow>
				{ ! isEmpty( marker.name ) && (
					<>
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
								disabled={
									error ||
									loadingPosts ||
									isEmpty( marker.name )
								}
								onClick={ () => onClick() }
							>
								Opslaan
							</Button>
						</PanelRow>
					</>
				) }
			</div>
		</Modal>
	);
}

export default MarkerModalCPT;
