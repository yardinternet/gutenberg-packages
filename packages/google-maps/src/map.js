/**
 * Internal dependencies
 */
import { loadScript } from './helpers';

/**
 * WordPress dependencies
 */
import { useEffect, createRef, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

function Map( props ) {
	const mapRef = createRef();
	const [ loading, setLoading ] = useState( true );
	const [ markers, setMarkers ] = useState( [] );
	const [ shapes, setShapes ] = useState( [] );
	const { attributes } = props;
	const { points, areas } = attributes;

	let map = false;

	useEffect( () => {
		try {
			initMap();
		} catch ( error ) {
			loadGoogleMaps().then( () => {
				initMap();
				setLoading( false );
			} );
		}
	}, [] );

	/**
	 * Init google map
	 */
	const initMap = () => {
		const mapOptions = {
			zoom: 8,
			center: { lat: 52.370216, lng: 4.895168 },
			disableDefaultUI: true,
		};

		map = new google.maps.Map( mapRef.current, mapOptions );
		plotMarkers();
		plotAreas();
	};

	/**
	 * Load google maps
	 *
	 * @return {Promise} resolves when gmaps is loaded
	 */
	const loadGoogleMaps = () => {
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
	};

	/**
	 * Plot all markers on the map instance
	 */
	const plotMarkers = () => {
		points.map( ( point ) => addMarker( point ) );
	};

	/**
	 * Plot all shapes on the map instance
	 */
	const plotAreas = () => {
		areas.map( ( area ) => addShape( area ) );
	};

	/**
	 * @param {string} point gmap location id
	 */
	const addMarker = ( point ) => {
		const marker = {
			id: point.id,
			gMarker: new google.maps.Marker( {
				position: point.latLng,
				// icon: Object.keys( this.props.markerIcon ).length
				// 	? this.props.markerIcon
				// 	: undefined,
			} ),
		};

		setMarkers( [ ...markers, marker ] ); // nalezen

		marker.gMarker.setMap( map );
	};

	/**
	 * @param {string} area gmap location id
	 */
	const addShape = ( area ) => {
		const shape = {
			polygon: new google.maps.Polygon( {
				paths: area.coords,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
			} ),
		};

		setShapes( [ ...shapes, shape ] ); // nalezen

		shape.polygon.setMap( map );
	};

	return (
		<>
			{ loading && <Spinner /> }
			<div className="yard-blocks-google-map" ref={ mapRef }></div>
		</>
	);
}

export default Map;
