import { Button, Dashicon } from '@wordpress/components';

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
		</div>
	);
}

function ListItem( { item, index, dispatch } ) {
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

List.Item = ListItem;

export default List;
