/**
 * Internal dependencies
 */
import { loadGoogleMaps } from './helpers';
import React from 'react';
/**
 * WordPress dependencies
 */
import { useEffect, useState, useRef } from '@wordpress/element';
import { Spinner, Button } from '@wordpress/components';

function Map( props ) {
	const [ map, setMap ] = useState( false );
	const [ loading, setLoading ] = useState( true );
	const [ markers, setMarkers ] = useState( [] );
	const { attributes, setAttributes } = props;
	const { points, polygons } = attributes;
	const ref = useRef( null );
	const testPath = useRef( [] );

	let poly = {};

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

	useEffect( () => {
		if ( typeof map === 'object' ) {
			plotMarkers();
			plotPolygons();

			poly = new google.maps.Polyline( {
				strokeColor: '#000000',
				strokeOpacity: 1.0,
				strokeWeight: 3,
			} );
			poly.setMap( map );

			// map.addListener( 'click', function( e ) {
			// 	console.log( e.latLng.toString() );
			// } );

			// Add a listener for the click event
			map.addListener( 'click', ( event ) => {
				const path = poly.getPath();

				console.log( testPath );

				// Because path is an MVCArray, we can simply append a new coordinate
				// and it will automatically appear.
				path.push( event.latLng );
				testPath.current.push( {
					lat: event.latLng.lat(),
					lng: event.latLng.lng(),
				} );

				// Add a new marker at the new plotted point on the polyline.
				const marker = new google.maps.Marker( {
					position: event.latLng,
					title: '#' + path.getLength(),
					map,
				} );
			} );
		}
	}, [ map ] );

	/**
	 * Init google map
	 */
	const initMap = () => {
		const mapOptions = {
			zoom: 8,
			center: { lat: 52.370216, lng: 4.895168 },
			disableDefaultUI: true,
		};

		setMap( new google.maps.Map( ref.current, mapOptions ) );
		// polygols
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
	const plotPolygons = () => {
		polygons.map( ( polygon ) => addPolygon( polygon ) );
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
	 * @param polygonn
	 * @param {string} polygon gmap location id
	 */
	const addPolygon = () => {
		const shape = {
			polygon: new google.maps.Polygon( {
				paths: testPath.current,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
			} ),
		};

		shape.polygon.setMap( map );
	};

	/**
	 * Called from querypopover
	 *
	 * @param {Object} point contains name, id and latLng
	 */
	// const addPoint = ( point ) => {
	// 	setAttributes( {
	// 		points: [ ...points, point ],
	// 	} );

	// 	addMarker( point );
	// };

	return (
		<>
			{ loading && <Spinner /> }
			<Button
				onClick={ () => {
					addPolygon();
				} }
			>
				Finish
			</Button>
			<div className="yard-blocks-google-map" ref={ ref }></div>
		</>
	);
}

export default Map;
