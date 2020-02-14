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
