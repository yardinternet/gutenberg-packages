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
