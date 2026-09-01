/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

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
	hasSubtitle = false,
	subtitle = '',
	setSubtitle = () => {},
	children = [],
	accordionId = '',
} ) {
	const [ isOpen, setIsOpen ] = useState( showOpen, showOpen || false );

	const blockProps = useBlockProps( {
		className: 'yard-blocks-collapse-item',
	} );

	useEffect( () => {
		if ( showOpen !== isOpen ) {
			setIsOpen( showOpen );
		}
	}, [ showOpen ] );

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
				setIsOpen={ setIsOpen }
			/>
			<Body
				id={ id }
				isAccordion={ isAccordion }
				accordionId={ accordionId }
				isOpen={ isOpen }
			>
				{ children }
			</Body>
		</div>
	);
}

export default CollapseItem;
