import { action } from '@storybook/addon-actions';
import MarkerGroups from '../marker-groups';
import { loadGoogleMaps } from '../../../helpers';

import '@wordpress/components/build-style/style.css';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default {
	title: 'GoogleMaps/Inspector',
};

const defaultMarkers = [
	{
		name: 'japie',
		latLng: {
			lat: 52.3666969,
			lng: 4.8945398,
		},
	},
	{
		name: 'keesie',
		latLng: {
			lat: 52.3666969,
			lng: 4.8945398,
		},
	},
];

loadGoogleMaps();

export const MarkGroup = () => {
	const [ markers, setMarkers ] = useState( [
		{ name: 'Lelystad', defaultMarkers },
		{ name: 'RandStad', defaultMarkers },
	] );

	const addGroup = () => {
		setMarkers( markers.concat( [ { name: 'test', markers } ] ) );
	};

	return (
		<>
			<Button onClick={ () => addGroup() }>Add group</Button>
			<MarkerGroups
				markerGroups={ markers }
				setAttributesCb={ ( data ) => setMarkers( data ) }
				onSubmit={ action( 'onSubmit' ) }
			/>
		</>
	);
};
// dfs
