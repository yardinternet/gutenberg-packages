/**
 * Internal dependencies
 */
import Header from './header';
import Body from './body';

function CollapseItem( {
	setHeaderText = () => {},
	headerText = '',
	showOpen = false,
	id = 0,
	isAccordion = true,
	children = [],
	accordionId = '',
} ) {
	return (
		<div className={ `yard-blocks-collapse-item` } key={ id }>
			<Header
				id={ id }
				headerText={ headerText }
				setHeaderText={ setHeaderText }
			/>
			<Body
				id={ id }
				showOpen={ showOpen }
				isAccordion={ isAccordion }
				accordionId={ accordionId }
			>
				{ children }
			</Body>
		</div>
	);
}

export default CollapseItem;
