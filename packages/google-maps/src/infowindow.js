/**
 * Create infowindow object
 *
 * @param {Object} map
 * @param {Object} polygon
 * @param {string} content
 * @param {string} url
 */
export function createInfowindow( { map, polygon, content, url } ) {
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

const isEmpty = ( obj ) => {
	for ( const key in obj ) {
		if ( obj.hasOwnProperty( key ) ) return false;
	}
	return true;
};
