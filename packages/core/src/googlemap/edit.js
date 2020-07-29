/**
 * Internal dependencies
 */
import { MARKER_ICON, MAP_OPTIONS } from './hooks';
import { getGoogleMapBlockSettings } from './helpers';
import Inspector from './components/inspector';
import Map from './components/map';
import MapKeyNotFound from './components/mapkey-not-found';
import QueryPopOver from './components/query-popover';

/**
 * WordPress dependencies
 */
import { createRef, Component, Fragment } from '@wordpress/element';

class GoogleMapEdit extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			popoverVisible: false,
		};

		this.mapID = createRef();
	}

	componentDidMount() {
		const { settings } = getGoogleMapBlockSettings(
			blockSettings.google_map // eslint-disable-line
		);
		const { setAttributes } = this.props;

		setAttributes( {
			apiKey: settings.google_map_api_key,
			mapOptions: JSON.stringify( MAP_OPTIONS ),
			markerIcon: JSON.stringify( MARKER_ICON ),
		} );
	}

	/**
	 * Called from querypopover
	 *
	 * @param {Object} point contains name, id and latLng
	 */
	addPoint = ( point ) => {
		const { setAttributes, attributes } = this.props;
		const { points } = attributes;

		setAttributes( {
			points: [ ...points, point ],
		} );

		this.mapID.current.addMarker( point );
	};

	/**
	 * @param {string} pointID id is based on google map location id
	 */
	removePoint = ( pointID ) => {
		const { setAttributes, attributes } = this.props;
		const { points } = attributes;

		setAttributes( {
			points: points.filter( ( point ) => point.id !== pointID ),
		} );

		this.mapID.current.removeMarker( pointID );
	};

	/**
	 * Toggle querypopover
	 */
	togglePopover = () => {
		this.setState( { popoverVisible: ! this.state.popoverVisible } );
	};

	/**
	 * Scale boundaries of google map based on the markers
	 *
	 * @param {boolean} bool bool
	 */
	setFitBounds = ( bool ) => {
		const { setAttributes } = this.props;
		setAttributes( { fitBounds: bool } );
		this.mapID.current.fitBounds( bool );
	};

	render() {
		const { attributes } = this.props;
		const { points, fitBounds, mapOptions, apiKey } = attributes;
		const { popoverVisible } = this.state;

		return (
			<Fragment>
				<Inspector
					removePoint={ this.removePoint }
					setFitBounds={ this.setFitBounds }
					togglePopover={ this.togglePopover }
					{ ...this.props }
				/>
				{ apiKey ? (
					<Fragment>
						<Map
							ref={ this.mapID }
							points={ points }
							markerIcon={ MARKER_ICON }
							fitBounds={ fitBounds }
							mapOptions={ mapOptions }
							{ ...this.props }
						/>
						{ popoverVisible && (
							<QueryPopOver
								addPoint={ this.addPoint }
								togglePopover={ this.togglePopover }
							/>
						) }
					</Fragment>
				) : (
					<MapKeyNotFound />
				) }
			</Fragment>
		);
	}
}

export default GoogleMapEdit;
