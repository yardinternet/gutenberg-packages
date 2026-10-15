/**
 * Returns a copy of the object without undefined values, keeping key order (null stays).
 *
 * @param {Object} object
 * @return {Object} object without undefined values
 */
export const omitUndefined = ( object = {} ) =>
	Object.fromEntries(
		Object.entries( object || {} ).filter(
			( [ , value ] ) => value !== undefined
		)
	);
