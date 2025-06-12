/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	PanelRow,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default ( { attributes, setAttributes, languages } ) => {
	const { languageCode } = attributes;

	const setLanguageCode = ( value ) => {
		setAttributes( { languageCode: value } );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Taal instellingen' ) }>
				<PanelRow>
					<SelectControl
						help={ __(
							'Selecteer de taal van de inhoud van dit blok als deze afwijkt van de standaard taal van de website.'
						) }
						label={ __( 'Taal' ) }
						onChange={ setLanguageCode }
						options={ [
							{ label: __( 'Standaard taal' ), value: '' },
							...languages,
						] }
						value={ languageCode }
					/>
				</PanelRow>
				{ languageCode && (
					<PanelRow>
						<Button
							isDestructive
							onClick={ () => setLanguageCode( '' ) }
							size={ 'small' }
							variant={ 'secondary' }
						>
							{ __( 'Stel opnieuw in' ) }
						</Button>
					</PanelRow>
				) }
			</PanelBody>
		</InspectorControls>
	);
};
