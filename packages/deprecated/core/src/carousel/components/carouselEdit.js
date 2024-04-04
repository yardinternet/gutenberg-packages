/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { pickRelevantMediaFiles } from '@yardinternet/gutenberg-editor-components';

import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	CarouselCaption,
} from 'reactstrap';

function CarouselEdit( props ) {
	const { attributes } = props;
	const {
		carouselImages,
		viewportDesktopHeight,
		autoPlay,
		interval,
		showIndicators,
		showControls,
		imageSize,
	} = attributes;
	const [ animating, setAnimating ] = useState( false );
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const next = () => {
		if ( animating ) {
			return;
		}
		const nextIndex =
			activeIndex === carouselImages.length - 1 ? 0 : activeIndex + 1;

		setActiveIndex( nextIndex );
	};

	const previous = () => {
		if ( animating ) {
			return;
		}
		const nextIndex =
			activeIndex === 0 ? carouselImages.length - 1 : activeIndex - 1;

		setActiveIndex( nextIndex );
	};

	const goToIndex = ( newIndex ) => {
		if ( animating ) {
			return;
		}

		setActiveIndex( newIndex );
	};

	const getSlides = ( images = [] ) => {
		let slides = [];
		const imagesConverted = images.map( ( image ) =>
			pickRelevantMediaFiles( image, imageSize )
		);
		if ( imagesConverted.length ) {
			slides = imagesConverted.map( ( item ) => (
				<CarouselItem
					onExiting={ () => setAnimating( true ) }
					onExited={ () => setAnimating( false ) }
					key={ item.url }
				>
					<img width="100%" src={ item.url } alt={ item.alt } />

					<CarouselCaption captionText={ item.caption } />
				</CarouselItem>
			) );
		}

		return slides;
	};

	return (
		<div
			style={ {
				height: `${ viewportDesktopHeight }px`,
				overflow: 'hidden',
			} }
			className={ props.className }
		>
			<Carousel
				interval={ autoPlay ? interval : false }
				autoPlay={ autoPlay }
				activeIndex={ activeIndex }
				next={ next }
				previous={ previous }
			>
				{ showIndicators && (
					<CarouselIndicators
						items={ carouselImages }
						activeIndex={ activeIndex }
						onClickHandler={ goToIndex }
					/>
				) }

				{ getSlides( carouselImages ) }

				<CarouselControl
					direction="prev"
					directionText={ __( 'Vorige' ) }
					onClickHandler={ previous }
				/>

				{ showControls && (
					<CarouselControl
						direction="next"
						directionText={ __( 'Volgende' ) }
						onClickHandler={ next }
					/>
				) }
			</Carousel>
		</div>
	);
}

export default CarouselEdit;
