/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';

const DeleteIcon = ( { handleRemove } ) => {
	return (
		<Button
			variant="secondary"
			onClick={ handleRemove }
			className="icon-picker-control-delete-icon-btn"
			isDestructive
		>
			Verwijder icoon
		</Button>
	);
};

export default DeleteIcon;
