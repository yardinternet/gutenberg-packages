/**
 * External dependencies
 */
import parse from 'html-react-parser';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function save( props ) {
	const { attributes } = props;
	const {
		id,
		headerText,
		showOpen,
		isAccordion,
		parentClientId,
		heading,
		structuredData,
		anchorName,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-collapse-item',
	} );

	const button = () => {
		return `
			<button
				class="yard-blocks-collapse-item__button"
				type="button"
				${ anchorName ? `data-anchor-name="${ anchorName }"` : '' }
				data-toggle="collapse"
				data-target="#collapse-${ id }"
				aria-expanded="${ showOpen ? 'true' : 'false' }"
				aria-controls="collapse-${ id }"
				${ structuredData ? 'itemprop="name"' : '' }
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
		<div
			{ ...blockProps }
			itemScope={ structuredData }
			itemProp={ structuredData ? 'mainEntity' : null }
			itemType={ structuredData ? 'https://schema.org/Question' : null }
		>
			<div className="yard-blocks-collapse-item__header">
				{ parse( header() ) }
			</div>
			<div
				className={ `collapse ${ showOpen ? 'show' : '' }` }
				id={ `collapse-${ id }` }
				data-parent={
					isAccordion ? `#accordion-${ parentClientId }` : null
				}
				itemScope={ structuredData }
				itemProp={ structuredData ? 'acceptedAnswer' : null }
				itemType={ structuredData ? 'https://schema.org/Answer' : null }
			>
				<div
					className="yard-blocks-collapse-item__body"
					itemProp={ structuredData ? 'text' : null }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

export default save;
