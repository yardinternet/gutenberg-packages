/**
 * WordPress dependencies
 */
import { useContext, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CollapseContext } from '../context';

function useCollapseItemState( {
	clientId,
	showOpen = false,
	isAccordion = true,
} ) {
	const accordion = useContext( CollapseContext );
	const openedItemId = accordion?.openedItemId;

	const [ isOpen, setIsOpen ] = useState( showOpen );

	useEffect( () => {
		setIsOpen( showOpen );
	}, [ showOpen ] );

	useEffect( () => {
		if ( ! isAccordion ) {
			return;
		}

		if ( ! openedItemId || openedItemId === clientId ) {
			return;
		}

		setIsOpen( false );
	}, [ openedItemId, isAccordion, clientId ] );

	const toggle = () => {
		const nextIsOpen = ! isOpen;

		setIsOpen( nextIsOpen );

		if ( nextIsOpen ) {
			accordion?.setOpenedItemId( clientId );
		}
	};

	return [ isOpen, toggle ];
}

export default useCollapseItemState;
