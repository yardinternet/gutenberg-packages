/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

const Inspector = ( { heading, structuredData, setAttributes, clientId } ) => {
	const { getBlocksByClientId } = useSelect( ( select ) => ( {
		getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
	} ) );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const onChange = ( value ) => {
		setAttributes( { heading: value } );

		const children = getBlocksByClientId( clientId )[ 0 ].innerBlocks;
		children.forEach( ( child ) =>
			updateBlockAttributes( child.clientId, { heading: value } )
		);
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Toegankelijkheid' ) }>
				<SelectControl
					label={ __( 'Koptekst' ) }
					value={ heading }
					options={ [
						{ label: 'Geen', value: '' },
						{ label: 'h2', value: 'h2' },
						{ label: 'h3', value: 'h3' },
						{ label: 'h4', value: 'h4' },
						{ label: 'h5', value: 'h5' },
						{ label: 'h6', value: 'h6' },
					] }
					onChange={ onChange }
					help={ __(
						'Selecteer het koptekst niveau voor de titels van de uitklap items.'
					) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'SEO instellingen' ) }>
				<ToggleControl
					label={ __( 'Voeg FAQ structured data toe' ) }
					checked={ structuredData }
					onChange={ ( value ) =>
						setAttributes( { structuredData: value } )
					}
					help={ __(
						'Als in dit blok veelgestelde vragen worden weergegeven, kan er structured data worden toegevoegd voor SEO.'
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
