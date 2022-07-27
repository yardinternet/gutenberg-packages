/**
 * WordPress dependencies
 */
import { Button, Popover, SearchControl, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './assets/scss/all.min.scss';

const IconPickerControl = ( { onChange, icon } ) => {
	const [ isOpen, setOpen ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ error, setError ] = useState( '' );

	const allowedStyles = applyFilters( 'yard-blocks.fontawesome-styles', [
		'solid',
		'regular',
		'light',
		'thin',
		'duotone',
		'brands',
	] );

	const searchFontAwesomeIcons = async ( searchValue ) => {
		const response = await getFontAwesomeIcons( searchValue );
		if ( ! response ) return;

		const result = response.data.search.reduce(
			( iconResults, iconData ) => {
				convertResponseToClassnames( iconData ).forEach( ( value ) => {
					iconResults.push( value );
				} );

				return iconResults;
			},
			[]
		);
		if ( ! result ) return;

		setSearchResults( result );
		setOpen( true );
	};

	const getFontAwesomeIcons = ( search ) => {
		const query = `{ search(version: "6.1.2", first: 100, query: "${ search }") { id styles } }`;

		return fetch( 'https://api.fontawesome.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify( { query } ),
		} )
			.then( ( res ) => res.json() )
			.catch( () =>
				setError(
					__(
						'Momenteel kunnen er geen iconen worden opgehaald, probeer het later nog een keer.'
					)
				)
			);
	};

	const convertResponseToClassnames = ( response ) => {
		return response.styles
			.filter( ( style ) => allowedStyles.includes( style ) ?? false )
			.map( ( style ) => `fa-${ style } fa-${ response.id }` );
	};

	return (
		<>
			{ icon && (
				<i className={ icon + ' icon-picker-control-preview-icon' }></i>
			) }
			<SearchControl
				placeholder={ __( 'Zoek een icoon' ) }
				value={ searchInput }
				help={ __( 'Gebruik Engelse termen om een icoon te zoeken.' ) }
				onChange={ ( searchValue ) => {
					setSearchInput( searchValue );
					searchFontAwesomeIcons( searchValue );
				} }
			/>
			{ error && (
				<Notice
					className="icon-picker-control-notice"
					status="error"
					isDismissible={ false }
				>
					{ error }
				</Notice>
			) }
			{ isOpen && searchInput && (
				<Popover
					title={ __( 'Kies een icoon' ) }
					onClose={ () => setOpen( false ) }
					focusOnMount={ false }
				>
					<div className="icon-picker-control-popover-container">
						{ searchResults.length > 0 ? (
							searchResults.map( ( result, key ) => {
								return (
									<div
										className="icon-picker-control-popover-btn-container"
										key={ key }
									>
										<Button
											onClick={ () => {
												onChange( result );
												setSearchInput( '' );
												setOpen( false );
											} }
										>
											<i className={ result }></i>
										</Button>
									</div>
								);
							} )
						) : (
							<p>{ __( 'Er zijn geen iconen gevonden' ) }</p>
						) }
					</div>
				</Popover>
			) }
		</>
	);
};

export default IconPickerControl;
