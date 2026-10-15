/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function save() {
	return (
		<ul { ...useBlockProps.save( { className: 'yard-blocks-iconlist' } ) }>
			<InnerBlocks.Content />
		</ul>
	);
}

export default save;
