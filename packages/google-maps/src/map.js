/**
 * Internal dependencies
 */
import { loadGoogleMaps, parseMarkerGroupMarkers } from './helpers';
import React from 'react';

/**
 * WordPress dependencies
 */
import { useEffect, useState, useRef } from '@wordpress/element';
import { Button } from '@wordpress/components';
import AddPolygonModal from './components/add-polygon-modal';

const mappie = '';

function Map( {
	polygons = [],
	drawerModusActive = false,
	setAttributes = () => {},
	passPolygons = [],
	markerGroups = [],
	googleMapStyles = { minHeight: '400px' },
} ) {
	const [ map, setMap ] = useState( mappie );
	const [ markers, setMarkers ] = useState( [] );
	const [ currentPolyLines, setCurrentPolyLines ] = useState( [] );
	const [ triggerMarker, setTriggerMarker ] = useState( [] );
	const [ currentPolyGon, setCurrentPolyGon ] = useState( null );
	const [ showAddPolygonModal, setShowAddPolygonModal ] = useState( false );
	const ref = useRef( null );
	const testPath = useRef( [] );
	const currentMarker = useRef( [] );

	/**
	 * Initiate map
	 */
	useEffect( () => {
		try {
			initMap();
		} catch ( error ) {
			loadGoogleMaps().then( () => {
				initMap();
			} );
		}
	}, [] );

	/**
	 * Plot markers when groupMarkers is changed
	 */
	useEffect( () => {
		if ( map ) {
			plotMarkers();
		}
	}, [ markerGroups ] );

	const listenerTest = () => {
		map.addListener( 'click', ( event ) => {
			populatePaths( event );
		} );
	};

	/**
	 * Watch state variable 'drawerModusActive'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			if ( drawerModusActive ) {
				listenerTest();
			} else {
				google.maps.event.clearListeners( map, 'click' );
			}
		}
	}, [ drawerModusActive ] );

	/**
	 * Watch state variable 'map'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			plotMarkers();
			plotPolygons();
		}
	}, [ map ] );

	/**
	 * Listener event 'click'
	 *
	 * @param {Object} event
	 */
	const populatePaths = ( event ) => {
		const poly = new google.maps.Polyline( {
			path: testPath.current,
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3,
		} );

		poly.setMap( map );
		currentPolyLines.push( poly );
		setCurrentPolyLines( currentPolyLines ); // trigger re-render

		const path = poly.getPath();

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
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 3,
			},
		} );

		currentMarker.current = currentMarker.current.concat( [ marker ] );
		setTriggerMarker( [ marker ] ); // trigger re-render after updating ref
	};

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
	};

	/**
	 * Plot all markers on the map instance
	 */
	const plotMarkers = () => {
		parseMarkerGroupMarkers( markerGroups ).map( ( point ) =>
			addMarker( point )
		);
	};

	/**
	 * Plot all shapes on the map instance
	 */
	const plotPolygons = () => {
		polygons.map( ( polygon ) => addPolygon( polygon ) );
	};

	/**
	 * Add polygon to the map from attributes
	 *
	 * @param {Object} polygon
	 */
	const addPolygon = ( polygon ) => {
		const shape = {
			polygon: new google.maps.Polygon( {
				paths: JSON.parse( polygon.coords ),
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
	 * Add polygon drawing temporary to the map
	 */
	const addPolygonDrawing = () => {
		const shape = {
			polygon: new google.maps.Polygon( {
				paths: testPath.current,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
				editable: true,
			} ),
		};

		shape.polygon.setMap( map );

		setCurrentPolyGon( shape.polygon );
		setShowAddPolygonModal( true );
	};

	/**
	 * Reset the drawing on the map
	 */
	const resetDrawing = () => {
		testPath.current = [];
		if ( currentPolyLines.length > 0 ) {
			currentPolyLines.map( function( item ) {
				return item.setMap( null );
			} );

			currentPolyLines.length = 0;
		}

		if ( currentMarker.current.length > 0 ) {
			currentMarker.current.map( function( item ) {
				return item.setMap( null );
			} );
		}

		if ( currentPolyGon !== null ) {
			currentPolyGon.setMap( null );
		}

		// empty the google maps object variables
		currentMarker.current = [];
		setCurrentPolyLines( currentPolyLines );
		setCurrentPolyGon( null );
		setTriggerMarker( [] ); // trigger re-render after updating ref
	};

	/**
	 * Called from querypopover
	 *
	 * @param {Object} point contains name, id and latLng
	 */
	const addPoint = ( point ) => {
		setAttributes( {
			latLngCollection: [ ...latLngCollection, point ],
		} );

		addMarker( point );
	};

	/**
	 *
	 * @param {string} name
	 * @param {Object} coordinates
	 */
	const addPolygonToAttributes = ( name, coordinates ) => {
		const polygon = {
			name,
			category: '',
			coords: JSON.stringify( coordinates ),
			color: '#000000',
		};

		// setAttributes( {
		// 	polygons: [ ...polygons, polygon ],
		// } );

		resetDrawing();
		setShowAddPolygonModal( false );
		passPolygons( polygon );
	};

	/**
	 * Close the modal
	 */
	const onRequestClose = () => {
		setShowAddPolygonModal( false );
	};

	return (
		<>
			<div className="d-flex flex-row">
				{ drawerModusActive && currentMarker.current.length > 0 && (
					<div className="mr-1 mb-1">
						<Button
							isPrimary
							isLarge
							onClick={ () => {
								addPolygonDrawing();
							} }
						>
							Finish
						</Button>
					</div>
				) }
				{ drawerModusActive && (
					<div className="mb-1">
						<Button
							isLarge
							onClick={ () => {
								resetDrawing();
							} }
						>
							Reset
						</Button>
					</div>
				) }
			</div>
			<div
				style={ googleMapStyles }
				className="yard-blocks-google-map"
				ref={ ref }
			></div>
			{ showAddPolygonModal && (
				<AddPolygonModal
					coordinates={ testPath.current }
					onSubmit={ addPolygonToAttributes }
					onRequestClose={ onRequestClose }
				/>
			) }
		</>
	);
}

export default Map;
