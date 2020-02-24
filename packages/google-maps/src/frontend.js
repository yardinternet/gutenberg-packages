// This file loads up all the frontend components
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';

const element = document.getElementById( 'gmap' );

const props = {};

Object.keys( element.dataset ).map( ( item ) => {
	return ( props[ item ] = JSON.parse( element.dataset[ item ] ) );
} );

ReactDOM.render(
	<Map
		{ ...props }
		markerGroups={ props.markergroups }
		filterOptions={ props.filteroptions }
		mapOptions={ props.mapOptions }
	/>,
	element
);
