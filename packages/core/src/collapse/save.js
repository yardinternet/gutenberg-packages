/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function Save( { attributes } ) {
	const { accordionId } = attributes;

	return (
		<div
			className={ `yard-blocks-collapse` }
			id={ `accordion-${ accordionId }` }
		>
			<InnerBlocks.Content />
		</div>
	);
}

export default Save;
