// This file loads up all the frontend components
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';

const attributes = {
	points: [],
	polygons: [],
};

const element = document.getElementById( 'gmap' );

const obj = {};

Object.keys( element.dataset ).map( ( item ) => {
	if ( typeof element.dataset[ item ] === 'string' ) {
		//return;
	}
	console.log( typeof element.dataset[ item ] );
	return ( obj[ item ] = JSON.parse( element.dataset[ item ] ) );
} );

console.log( obj );

ReactDOM.render( <Map attributes={ attributes } { ...obj } />, element );
