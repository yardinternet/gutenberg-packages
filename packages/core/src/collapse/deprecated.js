/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import attributes from './block.json';

const deprecated = [
	// since 1.3.0
	{
		attributes,
		save() {
			return (
				<div className={ `yard-blocks-collapse` } id={ `accordion` }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;
