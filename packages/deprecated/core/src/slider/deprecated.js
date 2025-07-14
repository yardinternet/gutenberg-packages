/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: {
			activeSlide: {
				type: 'string',
			},
		},
		save() {
			const blockProps = useBlockProps.save( {
				className: 'yard-blocks-slider | splide',
			} );

			return (
				<div { ...blockProps }>
					<div className="splide__track">
						<ul className="splide__list">
							<InnerBlocks.Content />
						</ul>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
