/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Wordpress dependencies
 */
import { withFocusOutside, TextControl } from '@wordpress/components';

class TextControlFocusOutside extends Component {
	constructor( props ) {
		super( props );
		this.state = { name: props.marker[ this.props.name ] };
	}

	handleFocusOutside() {
		this.props.setMarker( {
			...this.props.marker,
			...{ [ this.props.name ]: this.state.name },
		} );
	}

	render() {
		return (
			<TextControl
				label={ this.props.label }
				defaultValue={ this.props.defaultValue }
				value={ this.state.name }
				onChange={ ( value ) => {
					this.setState( {
						name: value,
					} );
				} }
			/>
		);
	}
}

export default withFocusOutside( TextControlFocusOutside );
