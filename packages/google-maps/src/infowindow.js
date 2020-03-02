/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Create infowindow object for Polygon
 *
 * @param {Object} map
 * @param {Object} polygon
 * @param {string} content
 * @param {string} url
 */
export function createInfowindowPolygon( { map, polygon, content, url } ) {
	if ( isEmpty( map ) ) {
		return false;
	}

	const infowindowPolygon = new google.maps.InfoWindow( {
		size: new google.maps.Size( 150, 50 ),
	} );

	const target = polygon.infowindowTargetURL
		? 'target="_blank" rel="noopener noreferrer"'
		: '';

	const infowindowAnchor = url
		? `<div><a href="${ url }" ${ target }>Website</a></div>`
		: false;

	const infowindowContent = `<div>${ content }</div>`;

	const infowindowHTML = infowindowAnchor
		? infowindowAnchor + infowindowContent
		: infowindowContent;

	google.maps.event.addListener( polygon, 'click', function() {
		infowindowPolygon.setContent( infowindowHTML );
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
} ) {
	if ( isEmpty( map ) ) {
		return false;
	}

	const targetURL = infowindowTargetURL
		? 'target="_blank" rel="noopener noreferrer"'
		: '';

	const infowindowAnchor = infowindowURL
		? `<div><a href="${ infowindowURL }" ${ targetURL }>Website</a></div>`
		: false;

	const infowindowContent = `<div>${ infowindow }</div>`;

	const infowindowHTML = infowindowAnchor
		? infowindowAnchor + infowindowContent
		: infowindowContent;

	const infowindowObject = new google.maps.InfoWindow( {
		content: infowindowHTML,
	} );

	marker.addListener( 'click', function() {
		infowindowObject.open( map, marker );
	} );
}
