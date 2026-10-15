/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import BasicForm from './components/basic-form';

// The editor canvas is an iframe; emotion must insert its styles into that document, not the admin page.
const caches = new WeakMap();
const getCache = ( doc ) => {
	if ( ! caches.has( doc ) ) {
		caches.set(
			doc,
			createCache( { key: 'gemeenten', container: doc.head } )
		);
	}
	return caches.get( doc );
};

function Edit( props ) {
	const [ doc, setDoc ] = useState();

	return (
		<>
			<Inspector { ...props } />
			<div ref={ ( el ) => el && setDoc( el.ownerDocument ) }>
				{ doc && (
					<CacheProvider value={ getCache( doc ) }>
						<BasicForm disabled={ true } { ...props.attributes } />
					</CacheProvider>
				) }
			</div>
		</>
	);
}

export default Edit;
