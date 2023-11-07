/**
 * Internal dependencies
 */
import { createInfowindowMarker } from './infowindow';

/**
 * External dependencies
 */
import tinycolor from 'tinycolor2';

/**
 * Appends loaded script to DOM
 *
 * @param {string}  src   url
 * @param {boolean} async
 * @return {Promise} promise
 */
export function loadScript( src = '', async = false ) {
	return new Promise( function ( resolve, reject ) {
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
			`https://maps.googleapis.com/maps/api/js?key=AIzaSyB74QitrBPl_gsHZ0jU5eP9TNq_vy-iX9Q&callback=resolveGoogleMapsPromise&sensor=true`,
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
					infowindowPharos: marker.infowindowPharos,
					infowindowCovered: marker.infowindowCovered,
					infowindowTargetURL: marker.infowindowTargetURL,
					infowindowURL: marker.infowindowURL,
					infowindowTitle: marker.infowindowTitle,
					infowindowPhone: marker.infowindowPhone,
					infowindowEmail: marker.infowindowEmail,
					infowindowContactPerson: marker.infowindowContactPerson,
					infowindowAddress: marker.infowindowAddress,
					icon:
						group.markerImage && group.markerImage.url
							? group.markerImage.url
							: '',
				};
			} )
		)
		.flat();
}

/**
 * Divide the markers between marker cluster groups
 *
 * @param {Object} map
 * @param {Array}  plotMarkerGroups
 * @return {Array} markerGroupsObjects
 */
export function prepareMarkerClusterGroups( map, plotMarkerGroups ) {
	const markerGroupsObjects = [];

	plotMarkerGroups.map( function ( group ) {
		const groupHolder = [];

		group.markers.map( function ( item ) {
			let marker = new google.maps.Marker( {
				position: item.latLng,
				icon:
					group.markerImage && group.markerImage.url
						? group.markerImage.url
						: '',
			} );

			const infowindow = item.infowindow;

			marker = createInfowindowMarker( {
				map,
				marker,
				infowindow,
				infowindowPharos: item.infowindowPharos,
				infowindowCovered: item.infowindowCovered,
				infowindowURL: item.infowindowURL,
				infowindowTargetURL: item.infowindowTargetURL,
				infowindowTitle: item.infowindowTitle,
				infowindowPhone: item.infowindowPhone,
				infowindowEmail: item.infowindowEmail,
				infowindowContactPerson: item.infowindowContactPerson,
				infowindowAddress: item.infowindowAddress,
			} );

			return groupHolder.push( marker );
		} );

		return markerGroupsObjects.push( groupHolder );
	} );

	return markerGroupsObjects;
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

/**
 * Get supporting CPT's that are available by the wp rest api
 *
 * @param {Array} fetchedPosts
 * @param {Array} currentMarkers
 */
export function populateSelectCPT( fetchedPosts, currentMarkers ) {
	try {
		const selectOptions = fetchedPosts.map( function ( item ) {
			return {
				value: item.title.rendered,
				label: item.title.rendered,
			};
		} );

		const filteredOptions = selectOptions.filter( ( option ) => {
			const result = currentMarkers.filter(
				( marker ) => marker.name === option.label
			);

			return result.length > 0 ? false : true;
		} );

		return filteredOptions;
	} catch ( e ) {
		throw new Error( e.message );
	}
}
