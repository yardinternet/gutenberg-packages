/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = () => {
	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-slide | splide__slide',
	} );

	return (
		<li { ...blockProps }>
			<InnerBlocks.Content />
		</li>
	);
};

export default Save;
