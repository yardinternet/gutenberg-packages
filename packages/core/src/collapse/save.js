/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function Save( { attributes } ) {
	const { accordionId, structuredData } = attributes;

	return (
		<div
			className="yard-blocks-collapse"
			id={ `accordion-${ accordionId }` }
			itemScope={ structuredData }
			itemType={ structuredData ? 'https://schema.org/FAQPage' : null }
		>
			<InnerBlocks.Content />
		</div>
	);
}

export default Save;
