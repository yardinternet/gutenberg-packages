/**
 * Internal dependencies
 */
import { filteredPreset as preset } from '../hooks';

/**
 * Filter the default preset, mostly called when a preset must be excluded
 *
 * @param {Object} filteredPreset nested object preset with layout options per viewport
 * @param {Array} layoutIDs all the layoutID that must be included in the preset
 * @return {Object} preset with all the specified layoutIDs
 */
export function filterPresetByLayoutIDs( filteredPreset, layoutIDs ) {
	Object.keys( filteredPreset ).map( ( col ) => {
		return Object.keys( filteredPreset[ col ].layouts ).map(
			( viewport ) => {
				return ( filteredPreset[ col ].layouts[ viewport ] =
					filteredPreset[ col ].layouts[ viewport ].filter(
						( item ) => {
							return layoutIDs.indexOf( item.id ) !== -1
								? true
								: false;
						}
					) );
			}
		);
	} );

	return filteredPreset;
}

/**
 * Return layout found by ID
 * Note: function could me more performant to stop looping when an item has found
 *
 * @param {string} id - unique layout id
 * @return {Object} - layoutobject contains all props
 */
export function findLayoutByID( id ) {
	let layout = false;

	Object.keys( preset ).map( ( col ) => {
		return Object.keys( preset[ col ].layouts ).map( ( viewport ) => {
			return preset[ col ].layouts[ viewport ].map( ( item ) => {
				if ( item.id === id ) {
					return ( layout = item );
				}
				return false;
			} );
		} );
	} );

	return layout;
}

/**
 * Returns the layoutOptions by column and viewport
 *
 * @param {string} column - column
 * @param {string} viewport - desktop or mobile
 * @return {Object} - LayoutOptions
 */
export function getLayoutOptionsByColAndLayout( column, viewport ) {
	return preset[ column ].layouts[ viewport ];
}

/**
 * Returns an array with classes or an empty string
 *
 * @param {string} id - layoutid
 * @return {(string|Array)} - returns all registered classnames
 */
export function getClassesByLayoutID( id ) {
	const result = findLayoutByID( id );
	return result !== undefined ? result.classNames : '';
}

/**
 * Returns the complete preset
 *
 * @return {Object} = returns all preset per column count
 */
export function getPreset() {
	return preset;
}

/**
 * Returns the column count of the preset
 *
 * @return {number} - returns amount of column in a given preset used in rangecontrol
 */
export function getPresetColumnCount() {
	return Object.keys( preset ).length;
}
