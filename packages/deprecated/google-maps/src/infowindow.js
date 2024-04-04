/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
/**
 * Internal dependencies
 */
import InfoWindow from './components/infowindow';

// Holds all infowindows on the map
const infowindowCollection = [];

/**
 * Create infowindow object for Polygon
 *
 * @param {Object} props
 */
export function createInfowindowPolygon( props ) {
	if ( ! hasInfowindowContent( props ) ) {
		return false;
	}

	const {
		map,
		polygon,
		content,
		pharos,
		url,
		urlTarget,
		title,
		email,
		phone,
		contactPerson,
		address,
	} = props;

	const infowindowPolygon = createInfowindow( {
		title,
		content,
		pharos,
		url,
		urlTarget,
		email,
		phone,
		contactPerson,
		address,
	} );

	google.maps.event.addListener( polygon, 'click', function () {
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
	if ( ! hasInfowindowContent( props ) ) {
		return props.marker;
	}

	const {
		map,
		marker,
		infowindow,
		infowindowPharos,
		infowindowCovered,
		infowindowURL,
		infowindowTargetURL,
		infowindowTitle,
		infowindowPhone,
		infowindowEmail,
		infowindowContactPerson,
		infowindowAddress,
	} = props;

	const infowindowObject = createInfowindow( {
		title: infowindowTitle,
		content: infowindow,
		pharos: infowindowPharos,
		covered: infowindowCovered,
		url: infowindowURL,
		urlTarget: infowindowTargetURL,
		email: infowindowEmail,
		phone: infowindowPhone,
		contactPerson: infowindowContactPerson,
		address: infowindowAddress,
	} );

	marker.addListener( 'click', function () {
		closeAllInfowindows();
		infowindowObject.open( map, marker );
	} );

	return marker;
}

/**
 *
 * @param {Object} param0
 */
function createInfowindow( {
	title,
	content,
	pharos,
	covered,
	url,
	urlTarget,
	email,
	phone,
	contactPerson,
	address,
} ) {
	const div = document.createElement( 'div' );

	render(
		<InfoWindow
			title={ title }
			content={ content }
			covered={ covered }
			pharos={ pharos }
			phone={ phone }
			url={ url }
			urlTarget={ urlTarget }
			email={ email }
			contactPerson={ contactPerson }
			address={ address }
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
