/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const {
		slidesPerPageDesktop,
		slidesPerPageLaptop,
		slidesPerPageTablet,
		slidesPerPageMobile,
		showPagination,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-slider | splide',
		'data-slides-per-page-desktop': slidesPerPageDesktop,
		'data-slides-per-page-laptop': slidesPerPageLaptop,
		'data-slides-per-page-tablet': slidesPerPageTablet,
		'data-slides-per-page-mobile': slidesPerPageMobile,
		'data-show-pagination': showPagination,
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
};

export default Save;
