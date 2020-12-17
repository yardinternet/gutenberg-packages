/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	loadGoogleMaps,
	parseMarkerGroupMarkers,
	prepareMarkerClusterGroups,
	loadScript,
} from './helpers';
import { createInfowindowPolygon, createInfowindowMarker } from './infowindow';
import AddPolygonModal from './components/add-polygon-modal';
import Legend from './components/legend';
import MapFilters from './components/map/map-filters';
import {
	filterMarkerGroupsByCategory,
	filterPolygonsByCategory,
} from './components/map/helpers';
var markers = []; // eslint-disable-line
var polygonsObjects = []; // eslint-disable-line
var markerClusters = []; // eslint-disable-line

function Map( {
	polygons = [],
	legend = [],
	polygonStyles = {
		strokeColor: '#000000',
		strokeOpacity: 0.8,
		strokeWeight: 1.5,
		fillOpacity: 0.5,
		fillColor: '#000000',
	},
	editMode = false,
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
	hardCodedInitialFilters = [],
	mapOptions = {
		height: 400,
		zoom: 8,
		center: { lat: 52.370216, lng: 4.895168 },
		disableDefaultUI: false,
		markerClusterer: false,
		markerClustererImagePath: false,
		initialObjectRender: true,
	},
	editMapCenter = false,
	googleMapStyles = {
		width: '100%',
		height: '100%',
		minHeight: `${ mapOptions.height }px`,
	},
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
	const [ selectedFilters, setSelectedFilters ] = useState(
		hardCodedInitialFilters
	);
	const [ initialObjectRender, setIntialObjectRender ] = useState(
		mapOptions.initialObjectRender
	);
	const [ editShapeId, setEditshapeId ] = useState( false );
	const [ objectRenderLock, setObjectRenderLock ] = useState( false );
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
			if ( initialObjectRender ) {
				plotMarkers();
				plotPolygons();
			}
		}
	} );

	/**
	 * Filter on categories which have the property of showFiltersOnPageLoad
	 * Any object with the assigned category will be shown on page load
	 */
	useEffect( () => {
		const newFilters = categories
			.filter( ( category ) => category.showFiltersOnPageLoad === 'true' )
			.map( ( category ) => category.name );

		if ( !! newFilters.length ) {
			setSelectedFilters( newFilters );
		}
	}, [] );

	useEffect( () => {
		if ( map ) {
			map.setZoom( mapOptions.zoom );
		}
	}, [ mapOptions ] );

	/**
	 * Watch state variable 'drawerModusActive'
	 */
	useEffect( () => {
		if ( typeof map === 'object' ) {
			if ( drawerModusActive ) {
				map.addListener( 'click', ( event ) => {
					addGoogleObjectsToMap( event );
				} );

				return () => {
					google.maps.event.clearListeners( map, 'click' );
				};
			}
		}
	}, [ drawerModusActive ] );

	/**
	 * Set mapcenter
	 */
	useEffect( () => {
		if ( typeof map === 'object' && editMapCenter ) {
			map.addListener( 'dragend', () => {
				setAttributes( {
					mapOptions: {
						...mapOptions,
						...{ center: map.getCenter().toJSON() },
					},
				} );
			} );

			return () => {
				google.maps.event.clearListeners( map, 'dragend' );
			};
		}
	} );

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

	const removePolygonObjects = () => {
		polygonsObjects.flat().map( function ( item ) {
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
		polygonsArray.flat().map( function ( item ) {
			try {
				const coords =
					typeof item.coords === 'string' && item.coords.length > 0
						? JSON.parse( item.coords )
						: [];

				const bounds = new google.maps.LatLngBounds();

				// get center of polygon
				coords.map( function ( coord ) {
					return bounds.extend(
						new google.maps.LatLng( coord.lat, coord.lng )
					);
				} );

				const polygon = {
					polygon: new google.maps.Polygon( {
						id: item.id,
						infowindow: item.infowindow,
						infowindowTitle: item.infowindowTitle,
						infowindowURL: item.infowindowURL,
						infowindowLat: bounds.getCenter().lat(),
						infowindowLng: bounds.getCenter().lng(),
						infowindowTargetURL:
							item.infowindowTargetURL === 'true' ? true : false,
						name: item.name,
						infowindowEmail: item.infowindowEmail,
						infowindowPhone: item.infowindowPhone,
						infowindowContactPerson: item.infowindowContactPerson,
						infowindowAddress: item.infowindowAddress,
						paths: coords,
						...polygonStyles,
						strokeColor: item.borderColor,
						fillColor: item.color,
						editable: editShapeId === item.id,
						strokeWeight: 1,
					} ),
				};

				/**
				 * Editable when a polygon is clicked
				 * Polygon loses focus when other polygon is clicked
				 * editShapeId tracks the last editable polygon id
				 */

				if ( editMode ) {
					google.maps.event.addListener(
						polygon.polygon,
						'click',
						( p, poly = polygon.polygon ) => {
							poly.setEditable( true );
							setEditshapeId( poly.id );
						}
					);
				}

				return handler.push( polygon );
			} catch ( e ) {
				return {};
			}
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
			...polygonStyles,
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
		resetMarkers();
		if ( objectRenderLock ) {
			return;
		}

		const plotMarkerGroups = selectedFilters.length
			? filteredMarkerGroups
			: markerGroups;

		parseMarkerGroupMarkers( plotMarkerGroups ).map( ( point ) =>
			addMarker( point )
		);

		if ( clusterMarkersScriptLoaded && mapOptions.markerClusterer ) {
			const markerClusterMarkers = prepareMarkerClusterGroups(
				map,
				plotMarkerGroups
			);

			markerClusterMarkers.map( function ( item ) {
				const MarkerCluster = new MarkerClusterer( map, item, {
					imagePath: mapOptions.markerClustererImagePath
						? `${ window.location.protocol }//${ window.location.host }/${ mapOptions.markerClustererImagePath }/m`
						: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
				} );

				return markerClusters.push( MarkerCluster );
			} );
		}
	};

	const resetMarkers = () => {
		// Unset all current markers
		markers.map( ( item ) => {
			return item.setMap( null );
		} );

		markers = [];

		// Unset all current marker clusters
		markerClusters.map( ( cluster ) => {
			return cluster.clearMarkers();
		} );

		markerClusters = [];
	};

	/**
	 * Plot all shapes on the map instance
	 */
	const plotPolygons = () => {
		removePolygonObjects();
		if ( objectRenderLock ) {
			return;
		}

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
			const polygonPaths = polygon.polygon.getPaths().getArray();

			// add listeners to polygon
			polygonPaths.forEach( function ( path ) {
				google.maps.event.addListener( path, 'set_at', function () {
					updatePolygon( polygon.polygon, path );
				} );

				google.maps.event.addListener( path, 'remove_at', function () {
					updatePolygon( polygon.polygon, path );
				} );

				google.maps.event.addListener( path, 'insert_at', function () {
					updatePolygon( polygon.polygon, path );
				} );
			} );

			/**
			 * Use a specified windowTitle otherwise fallback to name
			 */
			const infowindowTitle = polygon.polygon.infowindowTitle
				? polygon.polygon.infowindowTitle
				: polygon.polygon.name;

			createInfowindowPolygon( {
				map,
				polygon: polygon.polygon,
				content: polygon.polygon.infowindow,
				url: polygon.polygon.infowindowURL,
				urlTarget: polygon.polygon.infowindowTargetURL,
				title: infowindowTitle,
				email: polygon.polygon.infowindowEmail,
				phone: polygon.polygon.infowindowPhone,
				contactPerson: polygon.polygon.infowindowContactPerson,
				address: polygon.polygon.infowindowAddress,
			} );
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

		newPaths.getArray().map( function ( item ) {
			return newCoords.push( item );
		} );

		const newPolygons = polygons.map( function ( item ) {
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
	const addMarker = ( {
		latLng,
		infowindow,
		infowindowTargetURL,
		infowindowURL,
		infowindowTitle,
		infowindowPhone,
		infowindowEmail,
		icon,
	} ) => {
		let marker = new google.maps.Marker( {
			position: latLng,
			icon,
		} );

		const markerClustererEnabled = mapOptions.markerClusterer;

		marker = createInfowindowMarker( {
			map,
			marker,
			infowindow,
			infowindowURL,
			infowindowTargetURL,
			infowindowTitle,
			infowindowPhone,
			infowindowEmail,
		} );

		markers.push( marker );

		// when marker clusters are used there is no need for setting them seperatly
		if ( ! markerClustererEnabled ) {
			marker.setMap( map );
		}
	};

	/**
	 * Add polygon drawing temporary to the map
	 */
	const addPolygonDrawing = () => {
		const shape = {
			polygon: new google.maps.Polygon( {
				paths: testPath.current,
				...{ polygonStyles },
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
			currentPolyLines.map( function ( item ) {
				return item.setMap( null );
			} );

			currentPolyLines.length = 0;
		}

		if ( currentMarker.current.length > 0 ) {
			currentMarker.current.map( function ( item ) {
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
				...polygonStyles,
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

		if ( newFilters.length === 0 ) {
			setObjectRenderLock( true );
		} else {
			setObjectRenderLock( false );
		}
	};

	/**
	 * Watch the selectedFilter and markerGroups
	 */
	useEffect( () => {
		if ( ! markerGroups.length ) {
			return;
		}

		if ( !! selectedFilters.length ) {
			setIntialObjectRender( true );
		}

		setFilteredMarkerGroups(
			filterMarkerGroupsByCategory( {
				markerGroups,
				selectedFilters,
			} )
		);
	}, [ selectedFilters, markerGroups ] );

	/**
	 * Watch the selectedFilter and polygons
	 */
	useEffect( () => {
		if ( ! polygons.length ) {
			return;
		}

		if ( !! selectedFilters.length ) {
			setIntialObjectRender( true );
		}

		setFilteredPolygons(
			filterPolygonsByCategory( {
				polygons,
				selectedFilters,
			} )
		);
	}, [ selectedFilters, polygons ] );

	return (
		<>
			<div
				className="yard-google-map-advanced"
				style={ {
					display: 'flex',
					minHeight: `${ mapOptions.height }px`,
				} }
			>
				{ filterOptions.showFilters && (
					<MapFilters
						filters={ categories
							.filter( ( item ) => item.filter === 'true' )
							.map( ( item ) => item ) }
						filterOptions={ filterOptions }
						selectedFilters={ selectedFilters }
						onChange={ onFilterChange }
					/>
				) }
				<div
					style={ googleMapStyles }
					className="yard-google-map-advanced__map"
					ref={ ref }
				></div>
				<Legend
					map={ map }
					legend={ legend }
					selectedFilters={ selectedFilters }
				/>
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
