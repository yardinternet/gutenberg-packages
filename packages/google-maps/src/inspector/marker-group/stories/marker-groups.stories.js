import { action } from '@storybook/addon-actions';
import MarkerGroups from '../marker-groups';
import { loadGoogleMaps } from '../../../helpers';

import '@wordpress/components/build-style/style.css'; // d

export default {
	title: 'GoogleMaps/Inspector',
};

const markers = [
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

const Markers = [
	{ name: 'Lelystad', markers },
	{ name: 'RandStad', markers },
];

loadGoogleMaps();

export const MarkGroup = () => (
	<MarkerGroups
		markerGroups={ Markers }
		setAttributesCb={ action( 'onSubmit' ) }
		onSubmit={ action( 'onSubmit' ) }
	/>
);
