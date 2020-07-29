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
		if ( typeof google === 'undefined' ) {
			this.loadGoogleMaps()
				.then( () => {
					this.initMap();
				} )
				.catch( () => this.setState( { error: ! this.state.error } ) );
		} else {
			this.initMap();
		}
	}

	/**
	 * Init google map
	 */
	initMap() {
		const { mapOptions } = this.props;
		this.map = new google.maps.Map(
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
	 * @return {Promise} resolves when gmaps is loaded
	 */
	loadGoogleMaps() {
		return new Promise( ( resolve, reject ) => {
			window.resolveGoogleMapsPromise = () => {
				resolve();
			};

			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${ blockSettings.google_map.settings.google_map_api_key }&callback=resolveGoogleMapsPromise&sensor=true` // eslint-disable-line
			).catch( () => {
				reject();
			} );
		} );
	}

	/**
	 * @param {string} point gmap location id
	 */
	addMarker = ( point ) => {
		const { markers } = this.state;

		const marker = {
			id: point.id,
			gMarker: new google.maps.Marker( {
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
			const bounds = new google.maps.LatLngBounds();

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
