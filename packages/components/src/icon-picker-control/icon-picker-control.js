/**
 * WordPress dependencies
 */
import { Popover, SearchControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import DeleteIcon from './components/delete-icon';
import IconResults from './components/icon-results';
import { getFontAwesomeIcons } from './utils/api';
import { convertResponseToClassnames } from './utils/helpers';
import './editor.scss';

export const IconPickerControl = ( {
	onChange,
	icon,
	displayIconPreview = true,
	displayAsPopover = true,
	displayDeleteIcon = false,
	handleRemove,
} ) => {
	const [ isOpen, setOpen ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ popoverAnchor, setPopoverAnchor ] = useState();

	const { createNotice } = useDispatch( noticesStore );

	const allowedFamilyStyles = applyFilters(
		'yard.fontawesome-family-styles',
		[
			{ family: 'classic', style: 'solid' },
			{ family: 'classic', style: 'regular' },
			{ family: 'classic', style: 'light' },
			{ family: 'classic', style: 'thin' },
			{ family: 'classic', style: 'brands' },
			{ family: 'duotone', style: 'solid' },
			{ family: 'sharp', style: 'solid' },
			{ family: 'sharp', style: 'regular' },
			{ family: 'sharp', style: 'light' },
			{ family: 'sharp', style: 'thin' },
		]
	);

	const searchFontAwesomeIcons = async ( searchValue ) => {
		try {
			const response = await getFontAwesomeIcons( searchValue );
			if ( ! response ) return;

			const result = response?.data?.search.reduce(
				( iconResults, iconData ) => {
					convertResponseToClassnames(
						iconData,
						allowedFamilyStyles
					).forEach( ( value ) => {
						iconResults.push( value );
					} );

					return iconResults;
				},
				[]
			);
			if ( ! result ) return;

			setSearchResults( result );
			setOpen( true );
		} catch ( err ) {
			return showErrorNotice();
		}
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

	const handleIconClick = ( clickedIcon ) => {
		onChange( clickedIcon );
		setSearchInput( () => '' );
		setOpen( () => false );
	};

	return (
		<>
			{ displayIconPreview && icon && (
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
				ref={ setPopoverAnchor }
			/>

			{ displayAsPopover && searchInput && isOpen && (
				<Popover
					anchor={ popoverAnchor }
					title={ __( 'Kies een icoon' ) }
					onClose={ () => setOpen( false ) }
					focusOnMount={ false }
				>
					<IconResults
						searchResults={ searchResults }
						handleIconClick={ handleIconClick }
					/>
				</Popover>
			) }

			{ ! displayAsPopover && searchInput && (
				<IconResults
					searchResults={ searchResults }
					handleIconClick={ handleIconClick }
				/>
			) }

			{ displayDeleteIcon && icon && (
				<DeleteIcon handleRemove={ handleRemove } />
			) }
		</>
	);
};
