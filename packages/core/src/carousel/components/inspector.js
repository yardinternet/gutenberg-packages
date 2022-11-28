/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
/**
 * External dependencies
 */
import {
	pickRelevantMediaFiles,
	convertPickedMediaFiles,
} from '@yardinternet/gutenberg-editor-components';

function Inspector( {
	attributes,
	setAttributes,
	convertedCarouselImagesMediaObjects,
} ) {
	const {
		autoPlay,
		interval,
		carouselImages,
		imageSize,
		carouselId,
		viewportDesktopHeight,
		shuffle,
		showIndicators,
		showControls,
	} = attributes;

	const onSelectImageSize = ( size ) => {
		const carouselImagesMediaObjects =
			convertedCarouselImagesMediaObjects.map( ( image ) =>
				pickRelevantMediaFiles( image, size )
			);

		// set the converted image object to 'carouselImages' atttribute.
		setAttributes( {
			carouselImages: carouselImagesMediaObjects,
		} );
	};

	return (
		!! carouselImages.length && (
			<InspectorControls>
				<PanelBody title={ __( 'Instellingen' ) }>
					<TextControl
						label={ __( 'Hoogte carrousel in px' ) }
						type="number"
						value={ viewportDesktopHeight }
						onChange={ ( newValue ) =>
							setAttributes( {
								viewportDesktopHeight: parseInt( newValue, 10 ),
							} )
						}
					/>
					<SelectControl
						label={ __( 'Formaat afbeeldingen' ) }
						value={ imageSize }
						options={ [
							{ label: __( 'Volledig' ), value: 'full' },
							{ label: __( 'Groot' ), value: 'large' },
							{ label: __( 'Gemiddeld' ), value: 'medium' },
						] }
						onChange={ ( size ) => {
							setAttributes( { imageSize: size } );
							onSelectImageSize( size );
						} }
					></SelectControl>
					<ToggleControl
						label={ __( 'Autoplay' ) }
						help={ __(
							'Zet autoplay aan om de carrousel automatisch te laten afspelen.'
						) }
						checked={ autoPlay }
						onChange={ ( checked ) => {
							setAttributes( { autoPlay: checked } );
						} }
					/>
					<ToggleControl
						label={ __( 'Toon indicatoren' ) }
						help={ __(
							'Toon indicatoren aan de onderkant van de carrousel.'
						) }
						checked={ showIndicators }
						onChange={ ( checked ) => {
							setAttributes( { showIndicators: checked } );
						} }
					/>
					<ToggleControl
						label={ __( 'Toon knoppen' ) }
						help={ __(
							'Toon knoppen waarmee naar links of rechts kan worden genavigeerd.'
						) }
						checked={ showControls }
						onChange={ ( checked ) => {
							setAttributes( { showControls: checked } );
						} }
					/>
					<ToggleControl
						label={ __( 'Willekeurige volgorde' ) }
						help={ __(
							'Toon afbeeldingen in willekeurige volgorde.'
						) }
						checked={ shuffle }
						onChange={ ( checked ) => {
							setAttributes( { shuffle: checked } );
						} }
					/>
					<TextControl
						label={ __( 'Afspeelsnelheid' ) }
						help={ __(
							'In miliseconden, 1000 is gelijk aan 1 seconde.'
						) }
						type="number"
						value={ interval }
						onChange={ ( newValue ) =>
							setAttributes( {
								interval: parseInt( newValue, 10 ),
							} )
						}
					/>
					<TextControl
						label={ __( 'Carrousel ID' ) }
						help={ __(
							'Wijzig alleen de ID wanneer er meerdere carrousels op de pagina zijn.'
						) }
						type="text"
						value={ carouselId }
						onChange={ ( newValue ) =>
							setAttributes( { carouselId: newValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
		)
	);
}

/**
 * After selecting a size get the image object and convert it to correct format.
 */
export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const images = ownProps.attributes.carouselImages.map( ( image ) => {
		const getImage = getMedia( image.id );

		return convertPickedMediaFiles( getImage );
	} );

	return {
		convertedCarouselImagesMediaObjects: images,
	};
} )( Inspector );
