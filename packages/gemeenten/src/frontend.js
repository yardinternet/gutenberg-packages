// This file loads up all the frontend components
import React from 'react';
import ReactDOM from 'react-dom';
import * as PdcSearch from './blocks/pdc-search/frontend';
import * as PdcGreeting from './blocks/pdc-greeting/frontend';

const components = [ PdcSearch, PdcGreeting ];

components.map( ( item ) => {
	const element = document.getElementById( item.domID );

	if ( element ) {
		ReactDOM.render(
			<item.Component />,
			document.getElementById( item.domID )
		);
	}
	return false;
} );
