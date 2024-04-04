/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import {
	TextareaControl,
	Modal,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const msgDefault = {
	title: null,
	status: null,
};

/**
 *
 * @param {*} param0
 */
function ImportCoordinatesControl( {
	setAttributes = () => {},
	polygons = [],
	setModal = () => {},
	categories = [],
} ) {
	const [ importType, setImportType ] = useState( 'json' );
	const [ importCategory, setImportCategory ] = useState( '' );
	const [ input, setInput ] = useState( '' );
	const [ msg, setMessage ] = useState( msgDefault );
	const [ name, setName ] = useState( '' );
	const onClose = () => {
		setModal( false );
		setMessage( msgDefault );
	};

	const importTypeOptions = [
		{ label: 'Array', value: 'array' },
		{ label: 'JSON', value: 'json' },
	];

	const arrayTypeInstructionText = __(
		'Bijv [[ 5.0305408, 52.4014953, 0 ],[5.0034657, 52.4062515,0]]'
	);

	const jsonTypeInstructionText = __(
		'Bijv [{"lat":51.2135375,"lng":5.5954126},{"lat":51.3080685,"lng":5.625625},{"lat":51.3664086,"lng":5.885177}]'
	);

	const defaultImportCategory = [
		{ name: 'Selecteer categorie', value: '' },
	];

	return (
		<Modal title="Gebied coordinaten importeren" onRequestClose={ onClose }>
			<SelectControl
				label={ __( 'Selecteer type' ) }
				value={ importType }
				options={ importTypeOptions }
				onChange={ ( importValue ) => setImportType( importValue ) }
			/>
			<p style={ { maxWidth: '360px' } }>
				{ importType === 'json'
					? jsonTypeInstructionText
					: arrayTypeInstructionText }
			</p>
			<TextControl
				label="Naam"
				name={ name }
				onChange={ ( val ) => setName( val ) }
			/>
			<SelectControl
				label={ __( 'Selecteer categorie' ) }
				value={ importCategory }
				options={ defaultImportCategory
					.concat( categories )
					.map( ( category ) => ( {
						label: category.name,
						value: category.name,
					} ) ) }
				onChange={ ( val ) => setImportCategory( val ) }
			/>
			{ name && importCategory && (
				<TextareaControl
					label={ __( 'Invoer' ) }
					value={ input }
					onChange={ ( val ) => {
						setInput( val );
						if (
							importType === 'array' &&
							typeof parseLatLngFromCoords( val ) === 'object'
						) {
							setInput( val );
							setMessage( {
								title: __(
									'Ongeldige coordinaten',
									'textdomain'
								),
								status: false,
							} );
						} else {
							setAttributes( {
								polygons: polygons.concat( [
									{
										name,
										id: `${ name }-${
											polygons.length + 1
										}`,
										coords:
											importType === 'array'
												? parseLatLngFromCoords( val )
												: val,
										category: importCategory,
									},
								] ),
							} );

							setMessage( {
								title: __(
									'Shape succesvol geimporteerd! Venster sluit automatisch'
								),
								status: true,
							} );

							setTimeout( () => {
								onClose();
							}, 2000 );
						}
					} }
				/>
			) }
			{ msg.title !== null && msg.status !== null && (
				<span style={ { color: msg.status ? 'green' : 'red' } }>
					{ msg.title }
				</span>
			) }
		</Modal>
	);
}

/**
 * Parse coordinates from Array notation to latlng to make it usable for google maps
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
