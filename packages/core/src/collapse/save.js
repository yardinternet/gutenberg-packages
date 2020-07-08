/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function Save() {
	return (
		<div className={ `yard-blocks-collapse` } id={ `accordion` }>
			<InnerBlocks.Content />
		</div>
	);
}

export default Save;
