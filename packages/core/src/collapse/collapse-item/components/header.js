/**
 * WordPress dependencies
 */
import { PlainText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

function Header( { headerText = '', setHeaderText = () => {}, id = 0 } ) {
	return (
		<div className={ `yard-blocks-collapse-item__header` }>
			<PlainText value={ headerText } onChange={ setHeaderText } />
			<Button
				className={ `yard-blocks-collapse-item__button` }
				isPrimary={ true }
				data-toggle={ `collapse` }
				data-target={ `#collapse-${ id }` }
				aria-expanded={ false }
				aria-controls={ `collapse-${ id }` }
			>
				<i
					className={ `yard-blocks-collapse-item__arrow far fa-chevron-down` }
					aria-hidden={ true }
				></i>
			</Button>
		</div>
	);
}

export default Header;
