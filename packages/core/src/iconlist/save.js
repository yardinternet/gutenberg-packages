/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function save() {
	return (
		<ul className="yard-blocks-iconlist">
			<InnerBlocks.Content />
		</ul>
	);
}

export default save;
