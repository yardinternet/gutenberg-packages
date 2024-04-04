/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Wordpress dependencies
 */
import { withFocusOutside, TextareaControl } from '@wordpress/components';

class TextAreaControlPharosFocusOutside extends Component {
	constructor( props ) {
		super( props );
		this.state = { infowindowPharos: props.infowindowPharos };
	}

	handleFocusOutside() {
		this.props.setMarker( {
			...this.props.marker,
			...{ infowindowPharos: this.state.infowindowPharos },
		} );
	}

	render() {
		return (
			<div>
				<TextareaControl
					label={ this.props.label }
					defaultValue={ this.props.marker.infowindowPharos }
					onChange={ ( value ) => {
						this.setState( {
							infowindowPharos: value,
						} );
					} }
				/>
			</div>
		);
	}
}

export default withFocusOutside( TextAreaControlPharosFocusOutside );
