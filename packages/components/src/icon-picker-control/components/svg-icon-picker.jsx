/**
 * WordPress dependencies
 */
import { SelectControl, SearchControl, Popover } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import DeleteIcon from './delete-icon.jsx';
import SvgIconResults from './svg-icon-results.jsx';
import { searchIcons, getIconSvg } from '../utils/api';
import { getCachedSvg, setCachedSvg, hasCachedSvg } from '../utils/svg-cache';
import sanitizeSvg from '../utils/sanitize-svg';

const SEARCH_MIN_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 300;
const MAX_RESULTS = 10;

const SvgIconPicker = ( {
	sets,
	onChangeSVG,
	iconSVG,
	displayIconPreview = true,
	displayAsPopover = true,
	displayDeleteIcon = false,
	handleRemove,
} ) => {
	const setOptions = Object.keys( sets ).map( ( key ) => ( {
		label: key,
		value: key,
	} ) );

	const [ selectedSet, setSelectedSet ] = useState(
		setOptions[ 0 ]?.value ?? ''
	);
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ results, setResults ] = useState( [] );
	const [ isOpen, setIsOpen ] = useState( false );
	const [ popoverAnchor, setPopoverAnchor ] = useState();

	const abortControllerRef = useRef( null );
	const debounceTimerRef = useRef( null );
	const searchGenerationRef = useRef( 0 );

	const { createNotice } = useDispatch( noticesStore );

	useEffect( () => {
		return () => {
			if ( debounceTimerRef.current ) {
				clearTimeout( debounceTimerRef.current );
			}
			if ( abortControllerRef.current ) {
				abortControllerRef.current.abort();
			}
		};
	}, [] );

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

	/**
	 * Fetch SVGs for a list of icon objects, using the cache where possible.
	 * Returns the same list with a `svg` property added (string or 'ERROR').
	 *
	 * @param {Array} iconList - Array of { name, set, ... } objects.
	 * @return {Promise<Array>} The icon list with resolved SVG strings.
	 */
	const fetchSvgsForResults = ( iconList ) => {
		return Promise.all(
			iconList.map( async ( iconData ) => {
				const { name, set } = iconData;
				if ( hasCachedSvg( set, name ) ) {
					return { ...iconData, svg: getCachedSvg( set, name ) };
				}
				try {
					const svg = await getIconSvg( set, name );
					setCachedSvg( set, name, svg );
					return { ...iconData, svg };
				} catch {
					return { ...iconData, svg: 'ERROR' };
				}
			} )
		);
	};

	const performSearch = async ( set, query, signal ) => {
		const generation = ++searchGenerationRef.current;
		try {
			const iconList = await searchIcons( set, query, signal );
			if ( generation !== searchGenerationRef.current ) return;
			const limited = iconList.slice( 0, MAX_RESULTS );

			// Render immediately with skeleton placeholders.
			setResults( limited.map( ( i ) => ( { ...i, svg: null } ) ) );
			setIsOpen( true );

			// Then resolve SVGs and update.
			const withSvgs = await fetchSvgsForResults( limited );
			if ( generation !== searchGenerationRef.current ) return;
			setResults( withSvgs );
		} catch ( err ) {
			if ( err.name === 'AbortError' ) return;
			showErrorNotice();
		}
	};

	const handleSearchChange = ( value ) => {
		setSearchInput( value );

		if ( debounceTimerRef.current ) {
			clearTimeout( debounceTimerRef.current );
		}

		if ( value.length < SEARCH_MIN_LENGTH ) {
			setResults( [] );
			setIsOpen( false );
			return;
		}

		debounceTimerRef.current = setTimeout( () => {
			if ( abortControllerRef.current ) {
				abortControllerRef.current.abort();
			}
			abortControllerRef.current = new AbortController();
			performSearch(
				selectedSet,
				value,
				abortControllerRef.current.signal
			);
		}, SEARCH_DEBOUNCE_MS );
	};

	const handleSetChange = ( value ) => {
		if ( debounceTimerRef.current ) {
			clearTimeout( debounceTimerRef.current );
		}
		if ( abortControllerRef.current ) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
		searchGenerationRef.current++;
		setSelectedSet( value );
		setSearchInput( '' );
		setResults( [] );
		setIsOpen( false );
	};

	const handleIconClick = ( svg ) => {
		onChangeSVG( svg );
		setSearchInput( '' );
		setResults( [] );
		setIsOpen( false );
	};

	return (
		<>
			{ displayIconPreview && iconSVG && (
				<span
					className="icon-picker-control-preview-icon"
					dangerouslySetInnerHTML={ {
						__html: sanitizeSvg( iconSVG ),
					} }
				/>
			) }

			<SelectControl
				label={ __( 'Icoonset' ) }
				value={ selectedSet }
				options={ setOptions }
				onChange={ handleSetChange }
			/>

			<SearchControl
				placeholder={ __( 'Zoek een icoon' ) }
				value={ searchInput }
				help={ __( 'Gebruik Engelse termen om een icoon te zoeken.' ) }
				onChange={ handleSearchChange }
				ref={ setPopoverAnchor }
			/>

			{ displayAsPopover && searchInput && isOpen && (
				<Popover
					anchor={ popoverAnchor }
					title={ __( 'Kies een icoon' ) }
					onClose={ () => setIsOpen( false ) }
					focusOnMount={ false }
				>
					<SvgIconResults
						results={ results }
						onIconClick={ handleIconClick }
					/>
				</Popover>
			) }

			{ ! displayAsPopover && searchInput && (
				<SvgIconResults
					results={ results }
					onIconClick={ handleIconClick }
				/>
			) }

			{ displayDeleteIcon && iconSVG && (
				<DeleteIcon handleRemove={ handleRemove } />
			) }
		</>
	);
};

export default SvgIconPicker;
