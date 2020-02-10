import React from 'react';
import Locations from './components/locations';

const id = 'js-pdc-locations';

function LocationsWrapper() {
	const transformLocations = Object.keys( jsVars.locations ).map( ( location ) => {
		return {
			id: location,
			...jsVars.locations[ location ],
		};
	} );

	return <Locations locations={ transformLocations } />;
}

export { id, LocationsWrapper as Component };
