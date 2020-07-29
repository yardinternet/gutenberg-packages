/**
 * Internal dependencies
 */
import { validateURL } from '../helpers';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

function Inspector( { attributes, setAttributes } ) {
	const { title, url, height } = attributes;
	const [ urlToValidate, setUrlToValidate ] = useState( '' );
	const [ launchValidationURL, setLaunchValidationURL ] = useState( false );

	/**
	 * Listens to onClick
	 */
	useEffect( () => {
		if ( launchValidationURL ) {
			validateURL( urlToValidate )
				.then( ( val ) => {
					setAttributes( { url: val } );
				} )
				.finally( function () {
					setLaunchValidationURL( false );
				} );
		}
	}, [ launchValidationURL ] );

	return (
		<InspectorControls>
			<PanelBody title={ __( 'URL' ) } initialOpen={ true }>
				<TextControl
					label={ __( 'Title' ) }
					defaultValue={ title }
					onChange={ ( value ) => {
						setAttributes( { title: value } );
					} }
				/>
				<TextControl
					label={ __( 'URL' ) }
					defaultValue={ url }
					onChange={ ( value ) => {
						setUrlToValidate( value );
					} }
					help={
						!! url.length
							? __( 'URL is gevalideerd.' )
							: __(
									'URL is niet gevalideerd. Voorbeeld: "https://www.domein.nl"'
							  )
					}
				/>
				<Button
					isPrimary
					onClick={ () => setLaunchValidationURL( true ) }
				>
					{ __( 'Valideer' ) }
				</Button>
			</PanelBody>

			{ !! url.length && !! title.length && (
				<PanelBody title={ __( 'Afmetingen' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Hoogte (px)' ) }
						value={ height }
						onChange={ ( value ) => {
							setAttributes( { height: value } );
						} }
						min={ 1 }
						max={ 1000 }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);
}

export default Inspector;
