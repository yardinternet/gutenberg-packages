/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getIconSets } from '../utils/api';

/**
 * Detects whether the wp-icons REST API is available by fetching /yard/icons.
 *
 * Returns:
 *   - isLoading: true while the request is in flight (render nothing during this time)
 *   - isNewApiAvailable: true when /yard/icons returned at least one set
 *   - sets: the map of set name → metadata, e.g. { "fa-solid": { prefix: "fas" } }
 *
 * @return {{ sets: Object, isNewApiAvailable: boolean, isLoading: boolean }} The icon sets data and API availability status.
 */
const useIconSets = () => {
	const [ sets, setSets ] = useState( {} );
	const [ isNewApiAvailable, setIsNewApiAvailable ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		let isMounted = true;
		const controller = new AbortController();

		getIconSets( controller.signal )
			.then( ( data ) => {
				// eslint-disable-next-line no-useless-return
				if ( ! isMounted ) return;
				if ( data && Object.keys( data ).length > 0 ) {
					setSets( data );
					setIsNewApiAvailable( true );
				}
			} )
			.catch( ( err ) => {
				// eslint-disable-next-line no-useless-return
				if ( ! isMounted || err.name === 'AbortError' ) return;
				// API not available — will fall back to FontAwesome picker silently.
			} )
			.finally( () => {
				// eslint-disable-next-line no-useless-return
				if ( ! isMounted ) return;
				setIsLoading( false );
			} );

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [] );

	return { sets, isNewApiAvailable, isLoading };
};

export default useIconSets;
