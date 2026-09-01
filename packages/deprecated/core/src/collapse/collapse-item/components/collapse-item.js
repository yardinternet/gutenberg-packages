/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Header from './header';
import Body from './body';

function CollapseItem( {
	setHeaderText = () => {},
	headerText = '',
	id = 0,
	hasSubtitle = false,
	subtitle = '',
	setSubtitle = () => {},
	children = [],
	isOpen = false,
	onToggle = () => {},
} ) {
	const blockProps = useBlockProps( {
		className: 'yard-blocks-collapse-item',
	} );

	return (
		<div { ...blockProps } key={ id }>
			<Header
				id={ id }
				headerText={ headerText }
				setHeaderText={ setHeaderText }
				hasSubtitle={ hasSubtitle }
				subtitle={ subtitle }
				setSubtitle={ setSubtitle }
				isOpen={ isOpen }
				onToggle={ onToggle }
			/>
			<Body id={ id } isOpen={ isOpen }>
				{ children }
			</Body>
		</div>
	);
}

export default CollapseItem;
