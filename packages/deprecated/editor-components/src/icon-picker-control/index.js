/**
 * WordPress dependencies
 */
import { Button, Popover, SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './assets/scss/all.min.css';

const IconPickerControl = ( { onChange, icon } ) => {
	const [ isOpen, setOpen ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( [] );

	const { createNotice } = useDispatch( noticesStore );

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
		if ( response.errors ) return showErrorNotice();

		const result = response.data.searchPaginated.icons.reduce(
			( iconResults, iconData ) => {
				convertResponseToClassnames( iconData ).forEach( ( value ) => {
					iconResults.push( value );
				} );

				return iconResults;
			},
			[]
		);
		if ( ! result ) return;

		setSearchResults( () => result );
		setOpen( () => true );
	};

	const getFontAwesomeIcons = ( search ) => {
		const query = `{ searchPaginated(version: "7.x", pageSize: 50, query: "${ search }") 
			{ 
				icons { 
					id 
					familyStylesByLicense { 
						free { 
							family
							style 
						} 
						pro { 
							family
							style 
						} 
					} 
				} 
			}
		}`;

		return fetch( 'https://api.fontawesome.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify( { query } ),
		} )
			.then( ( res ) => res.json() )
			.catch( () => showErrorNotice() );
	};

	const convertResponseToClassnames = ( response ) => {
		const { free, pro } = response.familyStylesByLicense;
		const seen = new Set();
		const familyStyles = [ ...free, ...pro ].filter( ( style ) => {
			const key = `${ style.family }:${ style.style }`;
			if ( seen.has( key ) ) return false;
			seen.add( key );
			return true;
		} );

		// Convert allowed styles to the same format as the API response
		const mappedAllowedStyles = allowedStyles.map( ( style ) => {
			if ( style === 'duotone' ) {
				return { family: 'duotone', style: 'solid' };
			}
			return { family: 'classic', style };
		} );

		return familyStyles
			.filter( ( style ) =>
				mappedAllowedStyles.some(
					( allowedStyle ) =>
						allowedStyle.family === style.family &&
						allowedStyle.style === style.style
				)
			)
			.map(
				( style ) =>
					`fa-${ style.family } fa-${ style.style } fa-${ response.id }`
			);
	};

	const showErrorNotice = () => {
		createNotice(
			'error',
			__(
				'Momenteel kunnen er geen iconen worden opgehaald, probeer het later nog een keer.'
			),
			{
				isDismissible: true,
				type: 'snackbar',
				id: 'icon-picker-control-error',
			}
		);
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
					setSearchInput( () => searchValue );
					searchFontAwesomeIcons( searchValue );
				} }
			/>
			{ isOpen && searchInput && (
				<Popover
					title={ __( 'Kies een icoon' ) }
					onClose={ () => setOpen( () => false ) }
					focusOnMount={ false }
				>
					<div className="icon-picker-control-popover-container">
						{ searchResults?.map( ( result, key ) => {
							return (
								<div
									className="icon-picker-control-popover-btn-container"
									key={ key }
								>
									<Button
										onClick={ () => {
											onChange( result );
											setSearchInput( () => '' );
											setOpen( () => false );
										} }
									>
										<i className={ result }></i>
									</Button>
								</div>
							);
						} ) }

						{ ! searchResults.length && (
							<p>{ __( 'Er zijn geen iconen gevonden' ) }</p>
						) }
					</div>
				</Popover>
			) }
		</>
	);
};

export default IconPickerControl;
