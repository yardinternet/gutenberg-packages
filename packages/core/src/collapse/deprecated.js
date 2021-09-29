/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	// since 1.3.0
	{
		attributes: {
			accordionId: {
				type: 'string',
				default: '0',
			},
		},
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
