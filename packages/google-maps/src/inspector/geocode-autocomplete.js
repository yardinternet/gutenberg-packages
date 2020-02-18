/**
 * WordPress dependencies
 */
import React from 'react';
import AsyncSelect from 'react-select/async';

function GeocodeAutocomplete( {
	onChange = () => {},
	defaultInputValue = '',
} ) {
	/**
	 * Geocode( adress to latLng ) based on user input
	 *
	 * @return {Promise} resolve
	 * @param {string} value
	 */
	const geocodeAdress = ( value ) => {
		return new Promise( ( resolve, reject ) => {
			new google.maps.Geocoder().geocode(
				{ address: value },
				( results, status ) => {
					if ( status === 'OK' ) {
						const locations = results.map( ( item ) => {
							return {
								value: item.formatted_address,
								label: item.formatted_address,
								id: item.place_id,
								latLng: item.geometry.location,
							};
						} );
						resolve( locations );
					} else {
						reject( Error( 'location not found' ) );
					}
				}
			);
		} );
	};

	return (
		<>
			<AsyncSelect
				cacheOptions={ true }
				onChange={ onChange }
				defaultInputValue={ defaultInputValue }
				loadOptions={ geocodeAdress }
			/>
		</>
	);
}

export default GeocodeAutocomplete;
