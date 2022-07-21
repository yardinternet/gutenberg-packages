/**
 * WordPress dependencies
 */
import { Button, Popover, SearchControl, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

function IconSearch( { setAttributes, icon } ) {
	const [ isOpen, setOpen ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ error, setError ] = useState( '' );

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
		const query = `{ search(version: "6.1.1", first: 50, query: "${ search }") {
			id
			membership {
				free
				pro
			}
		} }`;

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
		const styles = [
			...response.membership.free,
			...response.membership.pro.filter(
				( style ) => ! response.membership.free.includes( style )
			),
		];

		return styles.map( ( style ) => `fa-${ style } fa-${ response.id }` );
	};

	return (
		<>
			{ icon && (
				<i
					className={ icon + ' yard-blocks-iconlist-preview-icon' }
				></i>
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
					className="yard-blocks-iconlist-notice"
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
					<div className="yard-blocks-iconlist-popover-container">
						{ searchResults.length > 0 ? (
							searchResults.map( ( result, key ) => {
								return (
									<div
										className="yard-blocks-iconlist-popover-btn-container"
										key={ key }
									>
										<Button
											onClick={ () => {
												setAttributes( {
													icon: result,
												} );
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
}

export default IconSearch;
