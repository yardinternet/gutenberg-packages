/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';

// Clicks inside the iframed editor canvas never reach the admin document, so listen on same-origin frames too.
const getDocuments = () => [
	document,
	...Array.from( window.frames, ( frame ) => {
		try {
			return frame.document;
		} catch {
			return null;
		}
	} ).filter( Boolean ),
];

export const useOnClickOutside = ( onClickOutside ) => {
	const ref = useRef();

	useEffect( () => {
		const listener = ( event ) => {
			if ( ! ref.current || ref.current.contains( event.target ) ) {
				return;
			}

			onClickOutside( event );
		};

		const documents = getDocuments();

		documents.forEach( ( doc ) => {
			doc.addEventListener( 'mousedown', listener );
			doc.addEventListener( 'touchstart', listener );
		} );

		return () => {
			documents.forEach( ( doc ) => {
				doc.removeEventListener( 'mousedown', listener );
				doc.removeEventListener( 'touchstart', listener );
			} );
		};
	}, [ ref, onClickOutside ] );

	return ref;
};
