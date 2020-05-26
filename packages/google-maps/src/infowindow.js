/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import { render } from '@wordpress/element';
import InfoWindow from './components/infowindow';

// Holds all infowindows on the map
const infowindowCollection = [];

/**
 * Create infowindow object for Polygon
 *
 * @param {Object} props
 */
export function createInfowindowPolygon( props ) {
	if ( isEmpty( map ) && ! hasInfowindowContent( props ) ) {
		return false;
	}

	const { map, polygon, content, url, urlTarget, name, email, phone } = props;

	const infowindowPolygon = createInfowindow( {
		title: name,
		content,
		url,
		urlTarget,
		email,
		phone,
	} );

	google.maps.event.addListener( polygon, 'click', function() {
		closeAllInfowindows();
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
 * @param {Object} props
 */
export function createInfowindowMarker( props ) {
	if ( isEmpty( map ) && ! hasInfowindowContent( props ) ) {
		return props.marker;
	}

	const {
		map,
		marker,
		infowindow,
		infowindowURL,
		infowindowTargetURL,
		infowindowTitle,
		infowindowPhone,
		infowindowEmail,
	} = props;

	const infowindowObject = createInfowindow( {
		title: infowindowTitle,
		content: infowindow,
		url: infowindowURL,
		urlTarget: infowindowTargetURL,
		email: infowindowEmail,
		phone: infowindowPhone,
	} );

	marker.addListener( 'click', function() {
		closeAllInfowindows();
		infowindowObject.open( map, marker );
	} );

	return marker;
}

/**
 *
 * @param {Object} param0
 */
function createInfowindow( { title, content, url, urlTarget, email, phone } ) {
	const div = document.createElement( 'div' );

	render(
		<InfoWindow
			title={ title }
			content={ content }
			phone={ phone }
			url={ url }
			urlTarget={ urlTarget }
			email={ email }
		/>,
		div
	);

	const infowindow = new google.maps.InfoWindow( {
		content: div,
	} );

	infowindowCollection.push( infowindow );

	return infowindow;
}

/**
 * Check if a field has an valid value, otherwise show no infowindow
 *
 * @param {Object} props
 */
function hasInfowindowContent( props = {} ) {
	return !! Object.values( props ).filter(
		( item ) => typeof item === 'string' && item.length > 0
	).length;
}

/**
 * Close all infowindows
 */
function closeAllInfowindows() {
	infowindowCollection.map( ( infowindow ) => infowindow.close() );
}
