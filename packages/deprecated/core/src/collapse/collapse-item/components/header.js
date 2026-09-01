/**
 * WordPress dependencies
 */
import { PlainText, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

function Header( {
	headerText = '',
	setHeaderText = () => {},
	hasSubtitle = false,
	subtitle = '',
	setSubtitle = () => {},
	id = 0,
	isOpen = false,
	onToggle = () => {},
} ) {
	return (
		<div className={ `yard-blocks-collapse-item__header` }>
			{ hasSubtitle ? (
				<div className="yard-blocks-collapse-item__header-title-container">
					<RichText
						tagName="h3"
						value={ headerText }
						onChange={ setHeaderText }
						placeholder={ __( 'Voer een titel in' ) }
					/>
					<RichText
						tagName="p"
						value={ subtitle }
						onChange={ setSubtitle }
						placeholder={ __( 'Voer een subtitel in' ) }
						className="mb-0"
					/>
				</div>
			) : (
				<PlainText value={ headerText } onChange={ setHeaderText } />
			) }

			<Button
				className={ `yard-blocks-collapse-item__button` }
				isPrimary={ true }
				aria-expanded={ isOpen ? 'true' : 'false' }
				aria-controls={ `collapse-${ id }` }
				onClick={ onToggle }
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
