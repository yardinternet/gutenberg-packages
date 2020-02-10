import { Modal, Button } from '@wordpress/components';
import { useState, useContext } from '@wordpress/element';
import { StateContext } from './context';

function List( props ) {
	const [ show, setModal ] = useState( false );

	return (
		<div>
			{ props.children }
			<Button onClick={ () => setModal( ! show ) }>Add</Button>
			{ show && <ListPopup /> }
		</div>
	);
}

function ListItem() {
	return <li>ListItem</li>;
}

function ListPopup() {
	const { state, poof } = useContext( StateContext );

	console.log( poof, state );

	return <Modal>Model content</Modal>;
}

List.PopUp = ListPopup;
List.Item = ListItem;

export default List;
