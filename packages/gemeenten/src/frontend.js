// This file loads up all the frontend components
/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Internal dependencies
 */
import * as PdcSearch from './blocks/pdc-search/frontend';
import * as PdcGreeting from './blocks/pdc-greeting/frontend';

const components = [ PdcSearch, PdcGreeting ];

components.map( ( item ) => {
	const element = document.getElementById( item.domID );

	if ( element ) {
		const root = ReactDOM.createRoot( element );
		root.render( <item.Component /> );
	}
	return false;
} );
