import {
	Button,
	Dashicon,
	ButtonGroup,
	BaseControl,
} from '@wordpress/components';

function List( { data, onRemove, onModify, children } ) {
	return (
		<div>
			{ data && data.length > 0 && (
				<>
					{ data.map( ( item, index ) => (
						<List.Item
							key={ index }
							item={ item.name }
							index={ index }
							onRemove={ onRemove }
							onModify={ onModify }
						/>
					) ) }
				</>
			) }
			{ children }
		</div>
	);
}

function ListItem( { item, index, onRemove, onModify } ) {
	return (
		<div key={ index }>
			<ButtonGroup>
				<BaseControl.VisualLabel>{ item }</BaseControl.VisualLabel>
				<Button isSmall isDefault onClick={ () => onModify( index ) }>
					<Dashicon icon="edit" />
				</Button>
				<Button isSmall isDefault onClick={ () => onRemove( index ) }>
					<Dashicon icon="trash" />
				</Button>
			</ButtonGroup>
		</div>
	);
}

List.Item = ListItem;

export default List;
