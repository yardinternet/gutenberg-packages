/**
 * Extract all data properties from a given DOM element
 *
 * @param {string} domID
 */
export const useDataAttributes = ( domID ) => {
	const item = document.getElementById( domID );

	return item.dataset;
};
