import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function MapOptions( { mapOptions = {}, setAttributes = () => {} } ) {
	const onChange = ( prop, val ) => {
		setAttributes( {
			mapOptions: {
				...mapOptions,
				...{ [ prop ]: val },
			},
		} );
	};

	return (
		<PanelBody
			initialOpen={ false }
			icon={ 'admin-settings' }
			title={ __( 'Map opties' ) }
		>
			<ToggleControl
				label="Marker cluster"
				checked={ mapOptions.markerClusterer }
				onChange={ ( val ) => onChange( 'markerClusterer', val ) }
			/>
			<RangeControl
				label="Hoogte"
				value={ mapOptions.height }
				onChange={ ( val ) => onChange( 'height', val ) }
				min={ 100 }
				max={ 2000 }
			/>
			<RangeControl
				label="Zoom"
				value={ mapOptions.zoom }
				onChange={ ( val ) => onChange( 'zoom', val ) }
				min={ 1 }
				max={ 20 }
			/>
		</PanelBody>
	);
}

export default MapOptions;
