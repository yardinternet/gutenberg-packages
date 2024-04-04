/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function Save( { attributes } ) {
	const { accordionId, structuredData } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-collapse',
	} );

	return (
		<div
			{ ...blockProps }
			id={ `accordion-${ accordionId }` }
			itemScope={ structuredData }
			itemType={ structuredData ? 'https://schema.org/FAQPage' : null }
		>
			<InnerBlocks.Content />
		</div>
	);
}

export default Save;
