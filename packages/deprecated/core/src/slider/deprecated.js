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
	{
		attributes: {
			activeSlide: {
				type: 'string',
			},
			slidesPerPageDesktop: {
				type: 'number',
				default: 3
			},
			slidesPerPagLaptop: {
				type: 'number',
				default: 3
			},
			slidesPerPageTablet: {
				type: 'number',
				default: 2
			},
			slidesPerPageMobile: {
				type: 'number',
				default: 1
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
