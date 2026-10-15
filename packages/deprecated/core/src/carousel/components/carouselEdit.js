/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { pickRelevantMediaFiles } from '@yardinternet/gutenberg-editor-components';

// Editor preview with Bootstrap carousel markup; reactstrap's Carousel depends on findDOMNode, which React 19 removes.
function CarouselEdit( props ) {
	const { attributes } = props;
	const {
		carouselImages = [],
		viewportDesktopHeight,
		showIndicators,
		showControls,
		imageSize,
	} = attributes;
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const slides = carouselImages.map( ( image ) =>
		pickRelevantMediaFiles( image, imageSize )
	);
	const count = slides.length;
	const current = count ? activeIndex % count : 0;
	const goTo = ( index ) => setActiveIndex( ( index + count ) % count );

	return (
		<div
			style={ {
				height: `${ viewportDesktopHeight }px`,
				overflow: 'hidden',
			} }
			className={ props.className }
		>
			<div className="carousel slide">
				{ showIndicators && (
					<ol className="carousel-indicators">
						{ slides.map( ( slide, index ) => (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
							<li
								key={ slide.url }
								className={
									index === current ? 'active' : undefined
								}
								onClick={ () => goTo( index ) }
							/>
						) ) }
					</ol>
				) }
				<div className="carousel-inner">
					{ slides.map( ( slide, index ) => (
						<div
							key={ slide.url }
							className={ `carousel-item${
								index === current ? ' active' : ''
							}` }
						>
							<img
								width="100%"
								src={ slide.url }
								alt={ slide.alt }
							/>
							{ slide.caption && (
								<div className="carousel-caption d-none d-md-block">
									<p>{ slide.caption }</p>
								</div>
							) }
						</div>
					) ) }
				</div>
				{ showControls && count > 1 && (
					<>
						<button
							type="button"
							className="carousel-control-prev"
							onClick={ () => goTo( current - 1 ) }
						>
							<span
								className="carousel-control-prev-icon"
								aria-hidden="true"
							/>
							<span className="sr-only">{ __( 'Vorige' ) }</span>
						</button>
						<button
							type="button"
							className="carousel-control-next"
							onClick={ () => goTo( current + 1 ) }
						>
							<span
								className="carousel-control-next-icon"
								aria-hidden="true"
							/>
							<span className="sr-only">
								{ __( 'Volgende' ) }
							</span>
						</button>
					</>
				) }
			</div>
		</div>
	);
}

export default CarouselEdit;
