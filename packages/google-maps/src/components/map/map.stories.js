import Map from '../../map';
import { parseMarkerGroupMarkers } from '../../helpers';

import '@wordpress/components/build-style/style.css';
import { useState } from 'react';

import { Button } from '@wordpress/components';

export default {
	title: 'GoogleMaps/Components',
};

const markers = [
	{
		name: 'Amsterdam',
		latLng: {
			lat: 52.3666969,
			lng: 4.8945398,
		},
	},
	{
		name: 'Houten',
		latLng: {
			lat: 52.03434,
			lng: 5.16567,
		},
	},
];

const markerGroups = [
	{ name: 'Noord Holland', markers },
	{ name: 'Utrecht', markers },
];

export const GoogleMap = () => {
	return (
		<>
			<Map markerGroups={ markerGroups } />
		</>
	);
};
