/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: {
			slidesPerPageDesktop: {
				type: 'number',
				default: 3,
				source: 'attribute',
			},
			slidesPerPageLaptop: {
				type: 'number',
				default: 3,
				source: 'attribute',
			},
			slidesPerPageTablet: {
				type: 'number',
				default: 2,
				source: 'attribute',
			},
			slidesPerPageMobile: {
				type: 'number',
				default: 1,
				source: 'attribute',
			},
		},
		save( { attributes } ) {
			const {
				slidesPerPageDesktop,
				slidesPerPageLaptop,
				slidesPerPageTablet,
				slidesPerPageMobile,
			} = attributes;

			return (
				<div
					className="yard-blocks-slider | splide"
					data-slides-per-page-desktop={ slidesPerPageDesktop }
					data-slides-per-page-laptop={ slidesPerPageLaptop }
					data-slides-per-page-tablet={ slidesPerPageTablet }
					data-slides-per-page-mobile={ slidesPerPageMobile }
				>
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
