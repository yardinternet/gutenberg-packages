/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

function Header( { headerText = '', setHeaderText = () => {}, hasSubtitle = false, subtitle = '', setSubtitle = () => {}, id = 0 } ) {
	return (
		<div className={ `yard-blocks-collapse-item__header` }>
			<div className="d-flex flex-column w-100">
				<RichText
					tagName="h3"
					value={ headerText }
					onChange={ setHeaderText }
					placeholder={ __(
						'Voer een titel in',
						'waiting-room-block'
					) }
				/>

				{ hasSubtitle ? <RichText
						tagName="p"
						value={ subtitle }
						onChange={ setSubtitle }
						placeholder={ __(
							'Voer een subtitel in',
							'waiting-room-block'
						) }
						className="mb-0"
					/> : '' }
			</div>

			<Button
				className={ `yard-blocks-collapse-item__button` }
				isPrimary={ true }
				data-toggle={ `collapse` }
				data-target={ `#collapse-${ id }` }
				aria-expanded="false"
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
