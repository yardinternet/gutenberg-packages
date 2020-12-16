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

function ImportAreas( {
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

	const importTypeOptions = [ { label: 'JSON', value: 'json' } ];

	const jsonTypeInstructionText = __(
		'Bijv [[{"lat":51.2135375,"lng":5.5954126},{"lat":51.3080685,"lng":5.625625},{"lat":51.3664086,"lng":5.885177}], [{lat":51.2135375,"lng":5.5954126},{"lat":51.3080685,"lng":5.625625},{"lat":51.3664086,"lng":5.885177}}]]'
	);

	const defaultImportCategory = [
		{ name: 'Selecteer categorie', value: '' },
	];

	return (
		<Modal title="Bulk gebieden importeren" onRequestClose={ onClose }>
			<SelectControl
				label={ __( 'Selecteer type' ) }
				value={ importType }
				options={ importTypeOptions }
				onChange={ ( importValue ) => setImportType( importValue ) }
			/>
			<p style={ { maxWidth: '360px' } }>{ jsonTypeInstructionText }</p>
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
						const polygonsTemp = [];
						try {
							const parsed = Object.values( JSON.parse( val ) );
							parsed.map( ( item ) => {
								return polygonsTemp.push( [
									{
										name: item.township,
										id: `${ item.township }-${
											polygons.length + 1
										}`,
										coords: JSON.stringify(
											item.coordinates
										),
										category: importCategory,
										color: item.color,
										borderColor: '#FFFFFF',
										infowindowTitle: item.township,
										infowindow: item.infowindow,
										infowindowPhone: item.phonenumber,
										infowindowEmail: item.email,
										infowindowURL: item.website,
										infowindowTargetURL: 'true',
									},
								] );
							} );
						} catch ( e ) {
							setMessage( {
								title: __(
									'Ongeldige coordinaten',
									'textdomain'
								),
								status: false,
							} );
							return;
						}

						setAttributes( {
							polygons: polygons.concat( polygonsTemp.flat() ),
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

export default ImportAreas;
