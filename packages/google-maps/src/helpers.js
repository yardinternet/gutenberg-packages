/**
 * External dependencies
 */
import tinycolor from 'tinycolor2';

/**
 * Appends loaded script to DOM
 *
 * @param {string} src url
 * @param {boolean} async
 * @return {Promise} promise
 */
export function loadScript( src = '', async = false ) {
	return new Promise( function( resolve, reject ) {
		const script = document.createElement( 'script' );
		script.src = src;
		script.async = async;
		script.onload = () => resolve( script );
		script.onerror = () =>
			reject( new Error( 'Script load error: ' + src ) );

		document.body.appendChild( script );
	} );
}

/**
 * Load google maps
 *
 * @return {Promise} resolves when gmaps is loaded
 */
export function loadGoogleMaps() {
	return new Promise( ( resolve, reject ) => {
		window.resolveGoogleMapsPromise = () => {
			resolve();
		};

		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=AIzaSyDjyUL9_S1E4INlI53pqe9t04OtCHhrJ_A&callback=resolveGoogleMapsPromise&sensor=true`,
			true
		).catch( () => {
			reject();
		} );
	} );
}

/**
 * Parse all markers from markergroups
 *
 * @param {Object} markergroups
 * @return {Array} markers
 */
export function parseMarkerGroupMarkers( markergroups ) {
	return markergroups
		.map( ( group ) =>
			group.markers.map( ( marker ) => {
				return {
					latLng: marker.latLng,
					infowindow: marker.infowindow,
					infowindowTargetURL: marker.infowindowTargetURL,
					infowindowURL: marker.infowindowURL,
					...( group.markerImage &&
						group.markerImage.url && {
							icon: group.markerImage.url,
						} ),
				};
			} )
		)
		.flat();
}

/**
 * Check if a string is a valid hex color code.
 *
 * @param {string} hex A possible hex color.
 * @return {boolean} True if the color is a valid hex color.
 */
export function isValidHex( hex ) {
	// disable hex4 and hex8
	const lh = String( hex ).charAt( 0 ) === '#' ? 1 : 0;
	return (
		hex.length !== 4 + lh &&
		hex.length < 7 + lh &&
		tinycolor( hex ).isValid()
	);
}
