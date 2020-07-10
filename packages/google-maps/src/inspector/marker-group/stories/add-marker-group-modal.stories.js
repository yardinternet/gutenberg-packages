/**
 * External dependencies
 */
import { action } from '@storybook/addon-actions';
/**
 * Internal dependencies
 */
import AddMarkerGroupModal from '../add-marker-group-modal';
/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
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
