/**
 * External dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Wordpress dependencies
 */
import { withFocusOutside, TextControl } from '@wordpress/components';

class TextControlFocusOutside extends Component {
	constructor( props ) {
		super( props );
		this.state = { infowindowURL: props.infowindowURL };
	}

	handleFocusOutside() {
		this.props.setMarker( {
			latLng: this.props.marker.latLng,
			name: this.props.marker.name,
			infowindow: this.props.marker.infowindow,
			infowindowTargetURL: this.props.targetURL,
			infowindowURL: this.state.infowindowURL,
		} );
	}

	render() {
		return (
			<div>
				<TextControl
					label={ this.props.label }
					defaultValue={ this.props.marker.infowindowURL }
					onChange={ ( value ) => {
						this.setState( {
							infowindowURL: value,
						} );
					} }
				/>
			</div>
		);
	}
}

export default withFocusOutside( TextControlFocusOutside );
