import {
	Button,
	Dashicon,
	ButtonGroup,
	BaseControl,
	PanelRow,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function List( { data, onRemove = () => {}, onModify = () => {}, children } ) {
	return (
		<>
			{ data && data.length > 0 ? (
				<div style={ { width: '100%' } }>
					{ data.map( ( item, index ) => (
						<List.Item
							key={ index }
							item={ item.name }
							index={ index }
							onRemove={ onRemove }
							onModify={ onModify }
						/>
					) ) }
				</div>
			) : (
				<span>
					{ __(
						'Er zijn geen items beschikbaar of voeg een item toe.',
						'DOMAIN'
					) }
				</span>
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
