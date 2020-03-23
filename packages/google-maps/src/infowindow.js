/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import { render } from '@wordpress/element';
import InfoWindow from './components/infowindow';

/**
 * Create infowindow object for Polygon
 *
 * @param {{map: Object, polygon: Object, content: string, url: string}} Object
 */
export function createInfowindowPolygon( {
	map,
	polygon,
	content,
	url,
	urlTarget,
	name,
	email,
	phone,
} ) {
	if ( isEmpty( map ) ) {
		return false;
	}

	const infowindowPolygon = new google.maps.InfoWindow( {
		size: new google.maps.Size( 150, 50 ),
	} );

	const div = document.createElement( 'div' );

	render(
		<InfoWindow
			title={ name }
			url={ url }
			urlTarget={ urlTarget }
			email={ email }
			phone={ phone }
			content={ content }
		/>,
		div
	);

	google.maps.event.addListener( polygon, 'click', function() {
		infowindowPolygon.setContent( div );
		infowindowPolygon.setPosition(
			new google.maps.LatLng(
				polygon.infowindowLat,
				polygon.infowindowLng
			)
		);
		infowindowPolygon.open( map );
	} );
}

/**
 * Create infowindow object voor Marker
 *
 * @param {Object} param
 */
export function createInfowindowMarker( {
	map,
	marker,
	infowindow,
	infowindowURL,
	infowindowTargetURL,
	infowindowTitle,
	infowindowPhone,
	infowindowEmail,
} ) {
	if ( isEmpty( map ) ) {
		return false;
	}

	const div = document.createElement( 'div' );

	render(
		<InfoWindow
			title={ infowindowTitle }
			url={ infowindowURL }
			urlTarget={ infowindowTargetURL }
			email={ infowindowEmail }
			phone={ infowindowPhone }
			content={ infowindow }
		/>,
		div
	);

	const infowindowObject = new google.maps.InfoWindow( {
		content: div,
	} );

	marker.addListener( 'click', function() {
		infowindowObject.open( map, marker );
	} );

	return marker;
}
