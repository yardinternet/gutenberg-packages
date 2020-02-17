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
