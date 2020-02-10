// This file loads up all the frontend components
import React from 'react';
import ReactDOM from 'react-dom';
import * as PdcLocations from './blocks/pdc-locations/frontend';
import * as PdcSearch from './blocks/pdc-search/frontend';

const components = [ PdcLocations, PdcSearch ];

components.map( ( item ) => {
	const element = document.getElementById( item.domID );

	if ( element ) {
		ReactDOM.render( <item.Component />, document.getElementById( item.domID ) );
	}
	return false;
} );
