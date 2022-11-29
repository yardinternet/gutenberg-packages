/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	// Since adding structured data
	{
		attributes: {
			accordionId: {
				type: 'string',
				default: '0',
			},
			heading: {
				type: 'string',
				default: '',
			},
		},
		save( { attributes } ) {
			const { accordionId } = attributes;

			return (
				<div
					className="yard-blocks-collapse"
					id={ `accordion-${ accordionId }` }
				>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
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
				<div className="yard-blocks-collapse" id="accordion">
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;
