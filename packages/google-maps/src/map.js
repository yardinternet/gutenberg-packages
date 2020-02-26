/**
 * Internal dependencies
 */
import {
	loadGoogleMaps,
	parseMarkerGroupMarkers,
	parsePolygonGroupMarkers,
	loadScript,
} from './helpers';
import React, { useState, useEffect, useRef } from 'react';

/**
 * WordPress dependencies
 */
import AddPolygonModal from './components/add-polygon-modal';
import MapFilters from './components/map/map-filters';
import {
	filterMarkerGroupsByCategory,
	filterPolygonsByCategory,
} from './components/map/helpers';

var markers = []; // eslint-disable-line
var polygonsObjects = []; // eslint-disable-line

function Map( {
	polygons = [],
	categories = [],
	filterOptions = {},
	drawerModusActive = false,
	setTriggerMarker = () => {},
	finishDrawerModus = false,
	setFinishDrawerModus = () => {},
	undo = false,
	setUndo = () => {},
	setAttributes = () => {},
	markerGroups = [],
	mapOptions = {
		zoom: 8,
		center: { lat: 52.370216, lng: 4.895168 },
		disableDefaultUI: false,
		markerClusterer: false,
	},
	editableShapesModus = true,
	googleMapStyles = { width: '100%', height: '100%', minHeight: '400px' },
} ) {
	const [ map, setMap ] = useState( false );
	const [
		clusterMarkersScriptLoaded,
		setClusterMarkersScriptLoaded,
	] = useState( false );
	const [ currentPolyLines, setCurrentPolyLines ] = useState( [] );
	const [ filteredMarkerGroups, setFilteredMarkerGroups ] = useState( [] );
	const [ filteredPolygons, setFilteredPolygons ] = useState( [] );
	const [ currentPolyGon, setCurrentPolyGon ] = useState( null );
	const [ showAddPolygonModal, setShowAddPolygonModal ] = useState( false );
	const [ selectedFilters, setSelectedFilters ] = useState( [] );
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

		loadScript(
			'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js',
			true
		).then( () => setClusterMarkersScriptLoaded( true ) );
	}, [] );

	useEffect( () => {
		if ( map ) {
			plotMarkers();
			plotPolygons();
		}
	} );

	/**
	 * Watch state variable 'drawerModusActive'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			if ( drawerModusActive ) {
				map.addListener( 'click', ( event ) => {
					addGoogleObjectsToMap( event );
				} );
			} else {
				google.maps.event.clearListeners( map, 'click' );
			}
		}
	}, [ drawerModusActive ] );

	/**
	 * Watch state variable 'finishDrawerModus'
	 */
	useEffect( () => {
		if ( typeof map === 'object' && finishDrawerModus ) {
			addPolygonDrawing();
		}
	}, [ finishDrawerModus ] );

	/**
	 * Watch state variable 'finishDrawerModus'
	 */
	useEffect( () => {
		if ( typeof map === 'object' && undo ) {
			resetDrawing();
		}
	}, [ undo ] );

	/**
	 * Watch state variable 'map'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			if ( polygons.length > 0 ) {
				plotPolygons();
			}
		}
	}, [ map, editableShapesModus ] );

	/**
	 * Watch props variable 'polygons'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			plotPolygons();
		}
	}, [ polygons ] );

	const removePolygonObjects = () => {
		polygonsObjects.flat().map( function( item ) {
			return item.polygon.setMap( null );
		} );

		polygonsObjects = [];
	};

	/**
	 * Create polygon objects from attributes
	 *
	 * @param {Array} polygonsArray
	 */
	const createPolygonObjects = ( polygonsArray ) => {
		const handler = [];
		polygonsArray.flat().map( function( item ) {
			const coords =
				typeof item.coords === 'string' && item.coords.length > 0
					? JSON.parse( item.coords )
					: [];
			const bounds = new google.maps.LatLngBounds();

			// get center of polygon
			coords.map( function( coord ) {
				return bounds.extend(
					new google.maps.LatLng( coord.lat, coord.lng )
				);
			} );

			const polygon = {
				polygon: new google.maps.Polygon( {
					id: item.id,
					infowindow: item.infowindow,
					infowindowLat: bounds.getCenter().lat(),
					infowindowLng: bounds.getCenter().lng(),
					paths: coords,
					strokeColor: item.borderColor,
					strokeOpacity: 0.8,
					strokeWeight: 3,
					fillColor: item.color,
					fillOpacity: 0.6,
					editable: editableShapesModus ? true : false,
				} ),
			};

			return handler.push( polygon );
		} );

		polygonsObjects.push( handler );
	};

	/**
	 * Listener event 'click'
	 *
	 * @param {Object} event
	 */
	const addGoogleObjectsToMap = ( event ) => {
		const poly = new google.maps.Polyline( {
			path: testPath.current,
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3,
		} );

		poly.setMap( map );
		currentPolyLines.push( poly );
		setCurrentPolyLines( currentPolyLines );

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
		setTriggerMarker( true ); // trigger re-render after updating ref
	};

	/**
	 * Init google map
	 */
	const initMap = () => {
		setMap( new google.maps.Map( ref.current, mapOptions ) );
	};

	/**
	 * Plot all markers on the map instance
	 */
	const plotMarkers = () => {
		// Unset all current markers
		markers.map( ( item ) => {
			return item.setMap( null );
		} );

		markers = [];

		const plotMarkerGroups = selectedFilters.length
			? filteredMarkerGroups
			: markerGroups;

		parseMarkerGroupMarkers( plotMarkerGroups ).map( ( point ) =>
			addMarker( point )
		);

		if ( clusterMarkersScriptLoaded && mapOptions.markerClusterer ) {
			new MarkerClusterer( map, markers, {
				imagePath:
					'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			} );
		}
	};

	/**
	 * Plot all shapes on the map instance
	 */
	const plotPolygons = () => {
		removePolygonObjects();

		const plotMarkerGroups = selectedFilters.length
			? filteredPolygons
			: polygons;

		createPolygonObjects( plotMarkerGroups );

		polygonsObjects.flat().map( ( polygon ) => addPolygon( polygon ) );
	};

	/**
	 * Add polygon to the map from attributes
	 *
	 * @param {Object} polygon
	 */
	const addPolygon = ( polygon ) => {
		if ( Object.keys( polygon ).length > 0 ) {
			polygon.polygon.setMap( map );

			// add listeners to polygon
			polygon.polygon.getPaths().forEach( function( path ) {
				google.maps.event.addListener( path, 'set_at', function() {
					updatePolygon( polygon.polygon, path );
				} );

				google.maps.event.addListener( path, 'remove_at', function() {
					updatePolygon( polygon.polygon, path );
				} );

				google.maps.event.addListener( path, 'insert_at', function() {
					updatePolygon( polygon.polygon, path );
				} );
			} );

			if (
				polygon.polygon.infowindow &&
				polygon.polygon.infowindow.length > 0
			) {
				const infowindowPolygon = new google.maps.InfoWindow( {
					size: new google.maps.Size( 150, 50 ),
				} );

				google.maps.event.addListener(
					polygon.polygon,
					'click',
					function() {
						infowindowPolygon.setContent(
							polygon.polygon.infowindow
						);
						infowindowPolygon.setPosition(
							new google.maps.LatLng(
								polygon.polygon.infowindowLat,
								polygon.polygon.infowindowLng
							)
						);
						infowindowPolygon.open( map );
					}
				);
			}
		}
	};

	/**
	 * Update edited polygon
	 *
	 * @param {Object} polygon
	 * @param {Object} newPaths
	 */
	const updatePolygon = ( polygon, newPaths ) => {
		const polygonID = polygon.id;
		const newCoords = [];

		newPaths.g.map( function( item ) {
			return newCoords.push( item );
		} );

		const newPolygons = polygons.map( function( item ) {
			if ( item.id === polygonID ) {
				item.coords = JSON.stringify( newCoords );
			}

			return item;
		} );

		setAttributes( {
			polygons: newPolygons,
		} );
	};

	/**
	 * @param {string} point gmap location id
	 */
	const addMarker = ( { latLng, icon } ) => {
		const marker = new google.maps.Marker( {
			position: latLng,
			icon,
		} );

		markers.push( marker );
		marker.setMap( map );
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
		setTriggerMarker( false ); // trigger re-render after updating ref
		setFinishDrawerModus( false );
		setUndo( false );
	};

	/**
	 *
	 * @param {string} name
	 * @param {Object} coordinates
	 */
	const addPolygonToAttributes = ( name, coordinates ) => {
		const randomID = Math.floor( Math.random() * 100 ) + 1;
		const polygonObject = {
			polygon: new google.maps.Polygon( {
				id: randomID.toString(),
				paths: coordinates,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
			} ),
		};

		polygonObject.polygon.setMap( map );
		polygonsObjects.push( polygonObject );

		const polygon = {
			id: polygonObject.polygon.id,
			name,
			category: '',
			coords: JSON.stringify( coordinates ),
			color: '#000000',
		};

		resetDrawing();
		setShowAddPolygonModal( false );
		setTriggerMarker( false );
		setFinishDrawerModus( false );
		setUndo( false );

		setAttributes( {
			polygons: [ ...polygons, polygon ],
		} );
	};

	/**
	 * Close the modal
	 */
	const onRequestClose = () => {
		setFinishDrawerModus( false );
		setUndo( false );
		setShowAddPolygonModal( false );
	};

	const onFilterChange = ( newFilters ) => {
		setSelectedFilters( newFilters );
	};

	useEffect( () => {
		setFilteredMarkerGroups(
			filterMarkerGroupsByCategory( {
				markerGroups,
				selectedFilters,
			} )
		);

		setFilteredPolygons(
			filterPolygonsByCategory( {
				polygons,
				selectedFilters,
			} )
		);
	}, [ selectedFilters ] );

	return (
		<>
			<div style={ { display: 'flex' } }>
				{ filterOptions.showFilters && (
					<MapFilters
						style={ { width: '300px' } }
						filters={ categories
							.filter( ( item ) => item.filter === 'true' )
							.map( ( item ) => item.name ) }
						filterOptions={ filterOptions }
						selectedFilters={ selectedFilters }
						onChange={ onFilterChange }
					/>
				) }
				<div
					style={ googleMapStyles }
					className="yard-blocks-google-map"
					ref={ ref }
				></div>
			</div>
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
