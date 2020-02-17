// This file loads up all the frontend components
import React from 'react';
import ReactDOM from 'react-dom';
import * as PdcSearch from './blocks/pdc-search/frontend';

const components = [ PdcSearch ];

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
