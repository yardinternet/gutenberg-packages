/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { FocalPointPicker } from '@wordpress/components';
import { useEffect, useCallback } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import {
	useCurrentPost,
	useCurrentPostMeta,
} from '@yardinternet/gutenberg-hooks';

export const FeaturedImageFocalPointPicker = createHigherOrderComponent(
	( PostFeaturedImage ) => {
		return ( props ) => {
			const { media } = props;

			if ( ! media ) {
				return <PostFeaturedImage { ...props } />;
			}

			const { currentPostType } = useCurrentPost();
			const [ featuredImageFocalPoint, setFeaturedImageFocalPoint ] =
				useCurrentPostMeta( 'featured_image_focal_point' );

			const allowedPostTypes = applyFilters(
				'yard.featured-image-focal-point-picker-allowed-post-types',
				[]
			);

			const setFeaturedImageMeta = useCallback(
				( value = { x: 0.5, y: 0.5 } ) => {
					setFeaturedImageFocalPoint( value );
				},
				[ setFeaturedImageFocalPoint ]
			);

			useEffect( () => {
				if ( featuredImageFocalPoint?.length === 0 ) {
					setFeaturedImageMeta();
				}
			}, [ featuredImageFocalPoint, setFeaturedImageMeta ] );

			if (
				! allowedPostTypes.includes( currentPostType ) ||
				! featuredImageFocalPoint ||
				! media?.source_url
			) {
				return <PostFeaturedImage { ...props } />;
			}

			return (
				<>
					<PostFeaturedImage { ...props } />
					<div style={ { marginTop: '1rem' } }>
						<FocalPointPicker
							label={ __(
								'Kies een focuspunt voor de uitgelichte afbeelding.'
							) }
							url={ media?.source_url }
							value={ featuredImageFocalPoint }
							onChange={ setFeaturedImageMeta }
							onDrag={ setFeaturedImageMeta }
						/>
					</div>
				</>
			);
		};
	},
	'FeaturedImageFocalPointPicker'
);
