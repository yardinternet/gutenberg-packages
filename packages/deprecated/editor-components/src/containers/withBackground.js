/**
 * External dependencies
 */
import { omitBy, isUndefined, isEqual } from 'lodash';
/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Higher order component for injecting background css properties
 *
 * @return { Function } - Higher order component
 */
export const withBackground = () =>
	createHigherOrderComponent(
		( OriginalComponent ) => ( props ) => {
			const { attributes, styles } = props;
			const {
				bgImgUrl,
				bgColor,
				dimRatio,
				bgRepeat,
				bgSize,
				focalPoint,
				backgroundFixed,
			} = attributes;

			const dimRatioClass =
				dimRatio !== undefined && dimRatio !== 0
					? `dim-ratio-${ dimRatio }`
					: '';
			const backgroundFixedClass = backgroundFixed ? 'has-parallax' : '';

			const backgroundStyles = {
				backgroundColor: setBgColor( bgColor, bgImgUrl, dimRatio ),
				backgroundImage: bgImgUrl ? `url(${ bgImgUrl })` : undefined,
				backgroundRepeat: bgRepeat,
				backgroundSize: bgSize,
				backgroundPosition: getBackgroundPosition( focalPoint ),
			};

			return (
				<OriginalComponent
					{ ...props }
					styles={ {
						...styles,
						...omitBy( backgroundStyles, isUndefined ),
					} }
					dimRatioClass={ dimRatioClass }
					backgroundFixedClass={ backgroundFixedClass }
				/>
			);
		},
		'withBackground'
	);

/**
 *	Unset bgColor when the bgImgUrl isset with a dimRatio of 0
 *
 * @param {string} bgColor  hex
 * @param {string} bgImgUrl url
 * @param {number} dimRatio 0 to 100
 * @return {string|undefined} return
 */
const setBgColor = ( bgColor, bgImgUrl, dimRatio ) => {
	return bgColor && bgImgUrl && dimRatio === 0 ? undefined : bgColor;
};

/**
 * Returns the backgroundPosition in a percentage string
 * { x:0.5, y:0.5  } -> 50% 50%
 *
 * @param {Object} focalPoint
 * @return {null|Object} object
 */
export const getBackgroundPosition = ( focalPoint ) => {
	if ( ! focalPoint || isEqual( focalPoint, { x: 0, y: 0 } ) ) {
		return null;
	}

	return `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`;
};
