import { useState } from '@wordpress/element';
import { TextareaControl, Modal, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const msgDefault = {
	title: null,
	status: null,
};

/**
 *
 * @param {Object} param0
 */
function ImportCoordinatesControl( {
	setAttributes = () => {},
	polygons = [],
	setModal = () => {},
} ) {
	const [ input, setInput ] = useState( '' );
	const [ msg, setMessage ] = useState( msgDefault );
	const [ name, setName ] = useState( '' );

	const onClose = () => {
		setModal( false );
		setMessage( msgDefault );
	};

	return (
		<Modal title="Shape coordinaten importeren" onRequestClose={ onClose }>
			<p>
				{ __(
					'Voer shapecoordinaten in bijv [[ 5.0305408, 52.4014953, 0 ],[5.0034657, 52.4062515,0]]',
					'textdomain'
				) }
			</p>
			<TextControl
				label="Naam"
				name={ name }
				onChange={ ( val ) => setName( val ) }
			/>
			<TextareaControl
				value={ input }
				onChange={ ( val ) => {
					setInput( val );
					if ( typeof parseLatLngFromCoords( val ) === 'object' ) {
						setInput( val );
						setMessage( {
							title: __( 'Ongeldige coordinaten', 'textdomain' ),
							status: false,
						} );
					} else {
						setAttributes( {
							polygons: polygons.concat( [
								{
									name,
									id: `${ name }-${ polygons.length + 1 }`,
									coords: parseLatLngFromCoords( val ),
								},
							] ),
						} );

						setMessage( {
							title: __(
								'Shape succesvol geimporteerd! Venster sluit automatisch',
								'textdomain'
							),
							status: true,
						} );

						setTimeout( () => {
							onClose();
						}, 2000 );
					}
				} }
			/>
			{ msg.title !== null && msg.status !== null && (
				<span style={ { color: msg.status ? 'green' : 'red' } }>
					{ msg.title }
				</span>
			) }
		</Modal>
	);
}

/**
 * Parse coordinates from KML json to latlng to make it usable for google maps
 *
 * @param {string} val
 */
export function parseLatLngFromCoords( val = '' ) {
	try {
		const json = JSON.parse( val );

		return JSON.stringify(
			json.map( ( item ) => {
				return {
					lat: item[ 1 ],
					lng: item[ 0 ],
				};
			} )
		);
	} catch ( error ) {
		return Error();
	}
}

export default ImportCoordinatesControl;
