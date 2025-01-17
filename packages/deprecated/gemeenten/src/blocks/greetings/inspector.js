/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

function Inspector( props ) {
	const { setAttributes, attributes } = props;
	const { greetings } = attributes;
	const [ newRange, setNewRange ] = useState( {
		start: '',
		end: '',
		value: '',
	} );
	const [ error, setError ] = useState( '' );

	const isValidRange = ( start, end ) => {
		const newStart = parseInt( start.replace( ':', '' ), 10 );
		const newEnd = parseInt( end.replace( ':', '' ), 10 );

		for ( const key in greetings ) {
			const [ existingStart, existingEnd ] = key
				.split( '-' )
				.map( ( time ) => parseInt( time.replace( ':', '' ), 10 ) );
			if (
				( newStart >= existingStart && newStart <= existingEnd ) ||
				( newEnd >= existingStart && newEnd <= existingEnd )
			) {
				return false;
			}
		}
		return true;
	};

	const addRange = () => {
		if ( ! isValidRange( newRange.start, newRange.end ) ) {
			setError(
				__( 'De tijdsperiode overlapt met een bestaande periode.' )
			);
			return;
		}
		const key = `${ newRange.start }-${ newRange.end }`;
		setAttributes( {
			greetings: { ...greetings, [ key ]: newRange.value },
		} );
		setNewRange( { start: '', end: '', value: '' } );
		setError( '' );
	};

	const removeRange = ( key ) => {
		const newGreetings = { ...greetings };
		delete newGreetings[ key ];
		setAttributes( { greetings: newGreetings } );
	};

	const setGreetingKey = ( value, key ) => {
		setAttributes( { greetings: { ...greetings, [ key ]: value } } );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				{ error && (
					<Notice status="error" isDismissible={ false }>
						{ error }
					</Notice>
				) }
				{ Object.keys( greetings ).map( ( key ) => (
					<div key={ key } style={ { marginBottom: '10px' } }>
						<TextControl
							label={ `${ key } uur` }
							value={ greetings[ key ] }
							onChange={ ( value ) =>
								setGreetingKey( value, key )
							}
						/>
						<Button
							isDestructive
							onClick={ () => removeRange( key ) }
						>
							{ __( 'Verwijder' ) }
						</Button>
					</div>
				) ) }
				<TextControl
					label={ __( 'Start Tijd (HH:MM)' ) }
					value={ newRange.start }
					onChange={ ( value ) =>
						setNewRange( { ...newRange, start: value } )
					}
				/>
				<TextControl
					label={ __( 'Eind Tijd (HH:MM)' ) }
					value={ newRange.end }
					onChange={ ( value ) =>
						setNewRange( { ...newRange, end: value } )
					}
				/>
				<TextControl
					label={ __( 'Label' ) }
					value={ newRange.value }
					onChange={ ( value ) =>
						setNewRange( { ...newRange, value: value } )
					}
				/>
				<Button isPrimary onClick={ addRange }>
					{ __( 'Periode toevoegen' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
