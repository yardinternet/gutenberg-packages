/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { omitUndefined } from '../utils-yard-blocks/omit-undefined';

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
						...omitUndefined( backgroundStyles ),
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
	if (
		! focalPoint ||
		( Object.keys( focalPoint ).length === 2 &&
			focalPoint.x === 0 &&
			focalPoint.y === 0 )
	) {
		return null;
	}

	return `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`;
};
