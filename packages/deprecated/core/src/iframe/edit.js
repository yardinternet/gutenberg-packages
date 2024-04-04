/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Iframe from './components/iframe';
import { validateURL, hasLength } from './helpers';

/**
 * WordPress dependencies
 */
import {
	Placeholder,
	TextControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { title, url } = attributes;
	const [ urlToValidate, setUrlToValidate ] = useState( '' );
	const [ launchValidationURL, setLaunchValidationURL ] = useState( false );

	/**
	 * Listens to onClick
	 */
	useEffect( () => {
		if ( launchValidationURL ) {
			validateURL( urlToValidate ).then( ( val ) => {
				setAttributes( { url: val } );
			} );
			setLaunchValidationURL( false );
		}
	}, [ launchValidationURL ] );

	return (
		<>
			{ hasLength( [ url, title ] ) && (
				<Inspector { ...{ attributes, setAttributes } } />
			) }
			{ ! hasLength( [ url, title ] ) ||
			! title.length ||
			! url.length ? (
				<Placeholder
					icon={
						<BlockIcon
							faClasses="far fa-crop-alt"
							marginRight={ true }
						/>
					}
					label={ __( 'Iframe' ) }
				>
					<div style={ { width: '100%' } }>
						<TextControl
							label={ __( 'Titel' ) }
							defaultValue={ title }
							onChange={ ( value ) => {
								setAttributes( { title: value } );
							} }
						/>
					</div>
					<div style={ { width: '100%' } }>
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
					</div>
					{ launchValidationURL && <Spinner /> }
				</Placeholder>
			) : (
				<Iframe { ...props } />
			) }
		</>
	);
}

export default Edit;
