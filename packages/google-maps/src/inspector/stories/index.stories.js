import { action } from '@storybook/addon-actions';
import AddMarkerGroupModal from '../add-marker-group-modal';

export default {
	title: 'GoogleMaps/Inspector',
};

export const addMarkerGroupModal = () => (
	<AddMarkerGroupModal onSubmit={ action( 'onSubmit' ) } />
);
