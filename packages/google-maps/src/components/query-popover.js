/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const noResultMsg = __( 'Geen resultaten gevonden' );

class QueryPopover extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			query: '',
		};
	}

	/**
	 * Geocode( adress to latLng ) based on user input
	 *
	 * @return {Promise} resolve
	 */
	geocodeAdress() {
		return new Promise( ( resolve, reject ) => {
			new google.maps.Geocoder().geocode(
				{ address: this.state.query },
				( results, status ) => {
					if ( status === 'OK' ) {
						const locations = results.map( ( item ) => {
							return {
								visual: '*',
								name: item.formatted_address,
								id: item.place_id,
								latLng: item.geometry.location,
							};
						} );
						resolve( locations );
					} else {
						reject( Error( 'location not found' ) );
					}
				}
			);
		} );
	}

	render() {
		const { query } = this.state;

		const completer = [
			{
				name: 'locations',
				triggerPrefix: '',
				isDebounced: true,
				options: ( term ) => {
					return this.geocodeAdress( term )
						.then( ( options ) => {
							if ( options.length ) {
								return options;
							}
						} )
						.catch( ( error ) => {
							console.log( 'error', error );
						} );
				},
				getOptionLabel: ( option ) => <span>{ option.name }</span>,
				isOptionDisabled: ( option ) => option.name === noResultMsg,
				getOptionKeywords: ( option ) => [ option.id ],
				getOptionCompletion: ( option ) => {
					this.setState( {
						query: '',
					} );
					this.props.addPoint( option );
					this.props.togglePopover();
				},
			},
		];

		return (
			<Fragment>
				<Popover className="yard-blocks-google-map__popover">
					<p>{ __( 'Voer een locatie in' ) }</p>
					<RichText
						tagName="p"
						value={ query }
						className={ classnames(
							'yard-blocks-google-map__popover-input'
						) }
						onChange={ ( newQuery ) =>
							this.setState( { query: newQuery } )
						}
						multiline={ false }
						autocompleters={ completer }
						formattingControls={ [] }
					/>
				</Popover>
			</Fragment>
		);
	}
}

export default QueryPopover;
