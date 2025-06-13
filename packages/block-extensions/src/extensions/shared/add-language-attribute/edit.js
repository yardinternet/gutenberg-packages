/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default ( { attributes, setAttributes, languages } ) => {
	const { lang } = attributes;

	const setLang = ( value ) => {
		setAttributes( { lang: value } );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Taal instellingen' ) }>
				<SelectControl
					help={ __(
						'Selecteer de taal van de inhoud van dit blok als deze afwijkt van de standaard taal van de website.'
					) }
					label={ __( 'Taal' ) }
					onChange={ setLang }
					options={ [
						{ label: __( 'Standaard taal' ), value: '' },
						...languages,
					] }
					value={ lang }
				/>
				{ lang && (
					<Button
						isDestructive
						onClick={ () => setLang( '' ) }
						size={ 'small' }
						variant={ 'secondary' }
					>
						{ __( 'Stel opnieuw in' ) }
					</Button>
				) }
			</PanelBody>
		</InspectorControls>
	);
};
