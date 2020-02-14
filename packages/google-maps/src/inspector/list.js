import {
	Modal,
	Button,
	Dashicon,
	TextControl,
	Slot,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

function List( { state, dispatch, onModify, children } ) {
	return (
		<div>
			{ state && state.length > 0 && (
				<>
					{ state.map( ( item, index ) => (
						<List.Item
							key={ index }
							item={ item.name }
							index={ index }
							dispatch={ dispatch }
							onModify={ onModify }
						/>
					) ) }
				</>
			) }
			{ children }
			{ /* { show && (
				<List.Modal
					title={ title }
					onRequestClose={ () => setModalShow( false ) }
				>
					{ modalContent }
				</List.Modal>
			) } */ }
		</div>
	);
}

function ListItem( { item, index, dispatch, onModify } ) {
	return (
		<div key={ index }>
			<span>{ item }</span>
			<Button
				onClick={ () =>
					dispatch( {
						type: 'remove',
						payload: index,
					} )
				}
			>
				<Dashicon icon="admin-home" />
			</Button>
			<Button
				onClick={ () => dispatch( { type: 'edit', payload: index } ) }
			>
				Weee
			</Button>
		</div>
	);
}

// function ListModal( { children, title, setModalShow } ) {
// 	return (
// 		<Modal title={ title } onRequestClose={ () => setModalShow( false ) }>
// 			{ children }
// 			<Button
// 				onClick={ () => {
// 					dispatch( { type: 'add', payload: value } );
// 					setModalShow( false );
// 				} }
// 			>
// 				Click me
// 			</Button>
// 		</Modal>
// 	);
// }

// List.modal = ListModal;
List.Item = ListItem;

export default List;
