/**
 * External dependencies
 */
import parse from 'html-react-parser';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import {renderToString} from "@wordpress/element";

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
		hasSubtitle,
		subtitle
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-collapse-item',
	} );

	const button = (
		<button
			className="yard-blocks-collapse-item__button"
			type="button"
			data-anchor-name={anchorName}
			data-toggle="collapse"
			data-target={`#collapse-${ id }`}
			aria-expanded={ showOpen ? 'true' : 'false' }
			aria-controls={`collapse-${ id }`}
			itemProp={ structuredData ? 'name' : '' }
		>
			{ hasSubtitle ?
				<>
					<div className="yard-blocks-collapse-item__button-heading">{ headerText }</div>
					<div className="yard-blocks-collapse-item__button-subheading">{ subtitle }</div>
				</>
			: headerText }
		</button>
	);

	const defaultButton  = `
		<${ heading } class="yard-blocks-collapse-item__heading">
			${ renderToString(button) }
		</${ heading }>
	`;

	return (
		<div
			{ ...blockProps }
			itemScope={ structuredData }
			itemProp={ structuredData ? 'mainEntity' : null }
			itemType={ structuredData ? 'https://schema.org/Question' : null }
		>
			<div className="yard-blocks-collapse-item__header">
				{ heading  === '' ? button  : parse(defaultButton) }
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
