/**
 * WordPress dependencies
 */
import { createContext, useMemo, useState } from '@wordpress/element';

export const CollapseContext = createContext( null );

export function CollapseProvider( { children } ) {
	const [ openedItemId, setOpenedItemId ] = useState( null );

	const accordion = useMemo(
		() => ( { openedItemId, setOpenedItemId } ),
		[ openedItemId ]
	);

	return (
		<CollapseContext.Provider value={ accordion }>
			{ children }
		</CollapseContext.Provider>
	);
}
