/**
 * External dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Wordpress dependencies
 */
import { withFocusOutside, TextareaControl } from '@wordpress/components';

class TextAreaControlFocusOutside extends Component {
	constructor( props ) {
		super( props );
		this.state = { infowindow: props.infowindow };
	}

	handleFocusOutside() {
		this.props.setMarker( {
			latLng: this.props.marker.latLng,
			name: this.props.marker.name,
			infowindowURL: this.props.marker.infowindowURL,
			infowindowTargetURL: this.props.targetURL,
			infowindow: this.state.infowindow,
		} );
	}

	render() {
		return (
			<div>
				<TextareaControl
					label={ this.props.label }
					defaultValue={ this.props.marker.infowindow }
					onChange={ ( value ) => {
						this.setState( {
							infowindow: value,
						} );
					} }
				/>
			</div>
		);
	}
}

export default withFocusOutside( TextAreaControlFocusOutside );
