import { action } from '@storybook/addon-actions';
import AddMarkerGroupModal from '../add-marker-group-modal';
import { useState } from 'react';
import { Button } from '@wordpress/components';

export default {
	title: 'GoogleMaps/Inspector',
};

export const AddMarkerModal = () => {
	const [ show, setShow ] = useState( false );

	return (
		<>
			<Button onClick={ () => setShow( true ) }>Show modal</Button>
			{ show && (
				<AddMarkerGroupModal
					onSubmit={ action( 'onSubmit' ) }
					onRequestClose={ () => setShow( false ) }
				/>
			) }
		</>
	);
};
