import Map from './map';
import { config } from './config';

const element = document.getElementById( config.mapDomId );
const { mapDomId } = config;

const domProps = {};
let props = {};

if ( element ) {
	Object.keys( element.dataset ).map( ( item ) => {
		return ( domProps[ item ] = JSON.parse( element.dataset[ item ] ) );
	} );

	props = {
		categories: domProps.categories,
		editableShapesModus: false,
		filterOptions: domProps.filteroptions,
		markerGroups: domProps.markergroups,
		mapOptions: domProps.mapoptions,
		polygons: domProps.polygons,
	};
}

export { Map, props, mapDomId };
