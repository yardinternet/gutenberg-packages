import { useState, useEffect } from 'react';

/**
 * Extract all data properties from a given DOM element
 *
 * @param {string} domID
 */
export const useDataAttributes = ( domID ) => {
	const [ dataset, setDataset ] = useState( {} );

	useEffect( () => {
		const item = document.getElementById( domID );
		setDataset( item.dataset );
	}, [] );

	return dataset;
};
