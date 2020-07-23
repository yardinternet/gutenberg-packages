import React from 'react'; // eslint-disable-line
import { find, get, omitBy, isUndefined, isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Higher order component for injecting backgroundClass from color palette
 *
 * @param {*} backgroundColorProperty - hex
 * @return { Function } - Higher order component
 */
export const withBackgroundClass = ( backgroundColorProperty = 'bgColor' ) =>
	createHigherOrderComponent(
		( OriginalComponent ) => ( props ) => {
			const backgroundColor = props.attributes[ backgroundColorProperty ];
			const backgroundColorClass = getBackgroundClassByColor(
				yardBlocks.editorColorPalette,
				backgroundColor
			);
			const styles = {
				backgroundColor:
					isUndefined( backgroundColorClass ) &&
					! isEmpty( backgroundColor )
						? backgroundColor
						: undefined,
			};

			return (
				<OriginalComponent
					{ ...props }
					backgroundColorClass={ backgroundColorClass }
					styles={ omitBy( styles, isUndefined ) }
				/>
			);
		},
		'withBackgroundClass'
	);

/**
 * Returns the color slug
 *
 * @param {Object} colors - colorpallete global variable
 * @param {string} color - hexcolor
 * @return {string} - primary
 */
export function getColorClassByColor( colors, color ) {
	return get( find( colors, { color } ), 'slug' );
}

/**
 * Returns the color slug background class
 *
 * @param {Object} colors - colorpalette global variable
 * @param {string} color - hexcolor
 * @return {string|undefined} - bg-primary
 */
export function getBackgroundClassByColor( colors, color ) {
	const slug = getColorClassByColor( colors, color );
	return slug !== undefined ? `bg-${ slug }` : slug;
}
