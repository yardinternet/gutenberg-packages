/**
 * Module-level SVG cache shared across all IconPickerControl instances.
 * Persists for the lifetime of the page session.
 *
 * @type {Map<string, string>}
 */
const svgCache = new Map();

/**
 * Retrieve a cached SVG string.
 *
 * @param {string} set  - Icon set identifier.
 * @param {string} name - Icon name.
 *
 * @return {string|undefined} Cached SVG string, or undefined if not cached.
 */
export const getCachedSvg = ( set, name ) => svgCache.get( `${ set }/${ name }` );

/**
 * Store an SVG string in the cache.
 *
 * @param {string} set  - Icon set identifier.
 * @param {string} name - Icon name.
 * @param {string} svg  - Raw SVG markup.
 */
export const setCachedSvg = ( set, name, svg ) =>
	svgCache.set( `${ set }/${ name }`, svg );

/**
 * Check whether an SVG is already cached.
 *
 * @param {string} set  - Icon set identifier.
 * @param {string} name - Icon name.
 *
 * @return {boolean}
 */
export const hasCachedSvg = ( set, name ) => svgCache.has( `${ set }/${ name }` );
