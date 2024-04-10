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
import { useCurrentPost } from '@yardinternet/gutenberg-hooks';

export const FeaturedImageFocalPointPicker = createHigherOrderComponent(
	( PostFeaturedImage ) => {
		return ( props ) => {
			const { media } = props;

			const { currentPostType, currentPostMeta, editPostMeta } =
				useCurrentPost();

			const allowedPostTypes = applyFilters(
				'yard.featured-image-focal-point-picker-allowed-post-types',
				[]
			);

			const setFeaturedImageMeta = useCallback(
				( value = { x: 0.5, y: 0.5 } ) => {
					editPostMeta( {
						featured_image_focal_point: value,
					} );
				},
				[ editPostMeta ]
			);

			useEffect( () => {
				if (
					currentPostMeta?.featured_image_focal_point.length === 0
				) {
					setFeaturedImageMeta();
				}
			}, [
				currentPostMeta?.featured_image_focal_point,
				setFeaturedImageMeta,
			] );

			if (
				! allowedPostTypes.includes( currentPostType ) ||
				! currentPostMeta ||
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
							value={
								currentPostMeta?.featured_image_focal_point
							}
							onChange={ setFeaturedImageMeta }
						/>
					</div>
				</>
			);
		};
	},
	'FeaturedImageFocalPointPicker'
);
