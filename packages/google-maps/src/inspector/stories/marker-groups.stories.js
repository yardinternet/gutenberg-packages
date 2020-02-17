import { action } from '@storybook/addon-actions';
import MarkerGroups from '../marker-groups';
import { loadGoogleMaps } from '../../helpers';

export default {
	title: 'GoogleMaps/Inspector',
};

const Markers = [
	{ name: 'Lelystad', markers: [] },
	{ name: 'RandStad', markers: [] },
];

loadGoogleMaps();

export const MarkGroup = () => (
	<MarkerGroups markerGroups={ Markers } onSubmit={ action( 'onSubmit' ) } />
);
