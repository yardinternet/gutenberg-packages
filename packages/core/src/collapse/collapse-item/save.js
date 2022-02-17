/**
 * External dependencies
 */
import parse from 'html-react-parser';

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
		heading,
	} = attributes;

	const button = () => {
		return `
			<button
				class="yard-blocks-collapse-item__button"
				type="button"
				data-toggle="collapse"
				data-target="#collapse-${ id }"
				aria-expanded="false"
				aria-controls="collapse-${ id }"
			>
				${ headerText }
			</button>
		`;
	};

	const header = () => {
		if ( heading === '' ) return button();

		return `
			<${ heading } class="yard-blocks-collapse-item__heading">
				${ button() }
			</${ heading }>
		`;
	};

	return (
		<div className="yard-blocks-collapse-item">
			<div className="yard-blocks-collapse-item__header">
				{ parse( header() ) }
			</div>
			<div
				className={ `collapse ${ showOpen ? 'show' : '' }` }
				id={ `collapse-${ id }` }
				data-parent={
					isAccordion ? `#accordion-${ parentClientId }` : null
				}
			>
				<div className="yard-blocks-collapse-item__body">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

export default save;
