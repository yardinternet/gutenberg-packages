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

function ImportMarkers( {
	setAttributes = () => {},
	setModal = () => {},
	markerGroups = [],
} ) {
	const [ importType, setImportType ] = useState( 'json' );
	const [ importGroup, setImportGroup ] = useState( '' );
	const [ input, setInput ] = useState( '' );
	const [ msg, setMessage ] = useState( msgDefault );
	const [ name, setName ] = useState( '' );
	const onClose = () => {
		setModal( false );
		setMessage( msgDefault );
	};

	const importTypeOptions = [ { label: 'JSON', value: 'json' } ];

	const jsonTypeInstructionText = __(
		'Bijv [ { "name": "KSV Drenthe", "address": "Europaweg-Zuid 1, \n9401 RK\nAssen", "covered": "VSV SHE (Treant)\nVSV Assen", "phonenumber": "0592-407270", "email": "info@kraamzeker.nl\n", "contactPerson": "1" } ]'
	);

	const defaultImportGroup = [ { name: 'Selecteer groep', value: '' } ];

	return (
		<Modal title="Bulk markers importeren" onRequestClose={ onClose }>
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
				label={ __( 'Selecteer groep' ) }
				value={ importGroup }
				options={ defaultImportGroup
					.concat( markerGroups )
					.map( ( category ) => ( {
						label: category.name,
						value: category.name,
					} ) ) }
				onChange={ ( val ) => setImportGroup( val ) }
			/>
			{ name && importGroup && (
				<TextareaControl
					label={ __( 'Invoer' ) }
					value={ input }
					onChange={ ( val ) => {
						setInput( val );
						const markersTemp = [];
						try {
							const parsed = Object.values( JSON.parse( val ) );
							parsed.map( ( item ) => {
								return markersTemp.push( {
									name: item.name,
									id: `ksv-${ markersTemp.length + 1 }`,
									latLng: item.latLng,
									infowindowTitle: item.name,
									infowindow: '',
									infowindowCovered: item.covered,
									infowindowPhone: item.phonenumber,
									infowindowContactPerson: item.contactPerson,
									infowindowEmail: item.email,
									infowindowAddress: item.address,
									infowindowTargetURL: 'true',
								} );
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

						markerGroups = markerGroups.map( ( group ) => {
							if ( group.name === importGroup ) {
								markersTemp.map( ( marker ) => {
									group.markers.push( marker );
									return marker;
								} );
							}
							return group;
						} );

						setAttributes( {
							markerGroups,
						} );

						setMessage( {
							title: __(
								'Markers succesvol geimporteerd! Venster sluit automatisch.'
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

export default ImportMarkers;
