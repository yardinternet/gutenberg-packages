import { Button, Dashicon, BaseControl } from '@wordpress/components';

function List( {
	explanationNoItems,
	data,
	displayValue = 'name',
	showCategoryLabel = false,
	onRemove = () => {},
	onModify = () => {},
	children,
} ) {
	const renderCategory = ( index, item ) => {
		if ( index === 0 ) {
			return item.category;
		}

		if ( index > 0 && data[ index - 1 ].category !== item.category ) {
			return item.category;
		}
		return null;
	};

	return (
		<>
			{ data && data.length > 0 ? (
				<div style={ { width: '100%' } }>
					{ data.map( ( item, index ) => {
						return (
							<div key={ index }>
								{ showCategoryLabel && (
									<div
										style={ {
											marginBottom: '10px',
											fontWeight: 'bold',
										} }
									>
										{ renderCategory( index, item ) }
									</div>
								) }
								<List.Item
									key={ index }
									item={
										item[ displayValue ].length
											? item[ displayValue ]
											: item.name
									}
									index={ index }
									onRemove={ onRemove }
									onModify={ onModify }
								/>
							</div>
						);
					} ) }
				</div>
			) : (
				<span>{ explanationNoItems }</span>
			) }
			{ children }
		</>
	);
}

function ListItem( { item, index, onRemove, onModify } ) {
	return (
		<div
			style={ {
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				marginBottom: '.5rem',
			} }
			key={ index }
		>
			<div style={ { marginRight: '10px', fontSize: '0.8rem' } }>
				<BaseControl.VisualLabel>{ item }</BaseControl.VisualLabel>
			</div>
			<div style={ { display: 'flex', marginLeft: 'auto' } }>
				<Button
					style={ { marginRight: '5px' } }
					isSmall
					isDefault
					onClick={ () => onModify( index ) }
				>
					<Dashicon icon="edit" />
				</Button>
				<Button isSmall isDefault onClick={ () => onRemove( index ) }>
					<Dashicon icon="trash" />
				</Button>
			</div>
		</div>
	);
}

List.Item = ListItem;

export default List;
