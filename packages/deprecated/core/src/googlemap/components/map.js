/**
 * External dependencies
 */
import { loadScript } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class Map extends Component {
	constructor( props ) {
		super( props );

		this.map = false;

		this.state = {
			markers: [],
			error: false,
		};

		this.mapRef = createRef();
		this.settings = blockSettings.google_map; // eslint-disable-line
	}

	componentDidMount() {
		// The map element lives in the editor canvas iframe, so the API has to be loaded into that window.
		const win = this.mapRef.current.ownerDocument.defaultView;

		if ( typeof win.google === 'undefined' ) {
			this.loadGoogleMaps( win )
				.then( () => {
					if ( ! this.mapRef.current ) {
						return;
					}
					this.google = win.google;
					this.initMap();
				} )
				.catch( () => this.setState( { error: ! this.state.error } ) );
		} else {
			this.google = win.google;
			this.initMap();
		}
	}

	/**
	 * Init google map
	 */
	initMap() {
		const { mapOptions } = this.props;
		this.map = new this.google.maps.Map(
			this.mapRef.current,
			JSON.parse( mapOptions )
		);
		this.addEvents();
		this.plotMarkers( this.map );
	}

	/**
	 * Add googlemap specific events
	 */
	addEvents() {
		const { setAttributes, attributes } = this.props;
		const { mapOptions } = attributes;

		this.map.addListener( 'center_changed', () => {
			const center = this.map.getCenter();
			const zoom = this.map.getZoom();

			setAttributes( {
				fitBounds: false,
				mapOptions: JSON.stringify( {
					...JSON.parse( mapOptions ),
					...{
						center: { lat: center.lat(), lng: center.lng() },
						zoom,
					},
				} ),
			} );
		} );
	}

	/**
	 * Load google maps
	 *
	 * @param {Window} win window to load the API into
	 * @return {Promise} resolves when gmaps is loaded
	 */
	loadGoogleMaps( win ) {
		// One load per window: the block can remount before the first load finishes.
		if ( win.yardGoogleMapsPromise ) {
			return win.yardGoogleMapsPromise;
		}

		win.yardGoogleMapsPromise = new Promise( ( resolve, reject ) => {
			win.resolveGoogleMapsPromise = () => {
				resolve();
			};

			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${ blockSettings.google_map.settings.google_map_api_key }&callback=resolveGoogleMapsPromise&sensor=true`, // eslint-disable-line
				win.document
			).catch( () => {
				reject();
			} );
		} );

		return win.yardGoogleMapsPromise;
	}

	/**
	 * @param {string} point gmap location id
	 */
	addMarker = ( point ) => {
		const { markers } = this.state;

		const marker = {
			id: point.id,
			gMarker: new this.google.maps.Marker( {
				position: point.latLng,
				icon: Object.keys( this.props.markerIcon ).length
					? this.props.markerIcon
					: undefined,
			} ),
		};

		this.setState( {
			markers: [ ...markers, marker ],
		} );

		marker.gMarker.setMap( this.map );
	};

	/**
	 * @param {string} id gmap location id
	 */
	removeMarker = ( id ) => {
		this.state.markers.map( ( marker ) => {
			if ( marker.id === id ) {
				marker.gMarker.setMap( null );
			}
			return false;
		} );

		this.setState( {
			markers: this.state.markers.filter(
				( marker ) => marker.id !== id
			),
		} );
	};

	/**
	 * Plot all markers on the map instance
	 */
	plotMarkers = () => {
		const { points } = this.props;

		points.map( ( pointID ) => this.addMarker( pointID ) );
	};

	/**
	 * Fit the map boundaries based on the plotted markers
	 *
	 * @param {boolean} bool
	 */
	fitBounds = ( bool ) => {
		if ( bool ) {
			const bounds = new this.google.maps.LatLngBounds();

			this.state.markers.map( ( marker ) => {
				bounds.extend( marker.gMarker.position );
				this.map.fitBounds( bounds );

				return false;
			} );
		}
	};

	render() {
		const { error } = this.state;

		return ! error ? (
			<div className="yard-blocks-google-map" ref={ this.mapRef }></div>
		) : (
			<div>
				{ __(
					'Google map could not be loaded, see error log for more information'
				) }
			</div>
		);
	}
}

export default Map;
