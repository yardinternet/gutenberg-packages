/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function save( props ) {
	const { attributes } = props;
	const {
		id,
		headerText,
		showOpen,
		isAccordion,
		parentClientId,
	} = attributes;

	return (
		<div className={ `yard-blocks-collapse-item` }>
			<div className={ `yard-blocks-collapse-item__header` }>
				<button
					className={ `yard-blocks-collapse-item__button` }
					type={ `button` }
					data-toggle={ `collapse` }
					data-target={ `#collapse-${ id }` }
					aria-expanded="false"
					aria-controls={ `collapse-${ id }` }
				>
					{ headerText }
				</button>
			</div>
			<div
				className={ `collapse ${ showOpen ? 'show' : '' }` }
				id={ `collapse-${ id }` }
				data-parent={
					isAccordion ? `#accordion-${ parentClientId }` : false
				}
			>
				<div className={ `yard-blocks-collapse-item__body` }>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

export default save;
