# Icon Picker Control Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `IconPickerControl` to auto-detect a new `/yard/icons` REST API and use it for set-based SVG icon picking, while keeping the existing FontAwesome path 100% intact for sites without the new API.

**Architecture:** A `useIconSets` hook detects API availability on mount. The wrapper `IconPickerControl` renders either the untouched `FontAwesomeIconPicker` or the new `SvgIconPicker` based on that detection and whether `onChangeSVG` is provided. A module-level SVG cache prevents repeat fetches within a page session.

**Tech Stack:** React (via `@wordpress/element`), `@wordpress/components` (SelectControl, SearchControl, Popover, Button), `@wordpress/data` + `@wordpress/notices` (snackbar errors), native `fetch` + `AbortController`, WordPress Jest preset for utility tests.

**Spec:** `docs/superpowers/specs/2026-04-13-icon-picker-control-refactor-design.md`

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `packages/components/src/icon-picker-control/utils/api.js` | Add `getIconSets`, `searchIcons`, `getIconSvg` |
| Create | `packages/components/src/icon-picker-control/utils/svg-cache.js` | Module-level SVG Map, shared across instances |
| Create | `packages/components/src/icon-picker-control/utils/svg-cache.test.js` | Unit tests for cache helpers |
| Create | `packages/components/src/icon-picker-control/hooks/use-icon-sets.js` | Fetch `/yard/icons` once on mount |
| Create | `packages/components/src/icon-picker-control/components/font-awesome-icon-picker.jsx` | Current FA picker logic extracted verbatim |
| Create | `packages/components/src/icon-picker-control/components/svg-icon-results.jsx` | SVG preview grid (max 10, skeleton placeholders) |
| Create | `packages/components/src/icon-picker-control/components/svg-icon-picker.jsx` | Set selector + debounced search + SVG results |
| Modify | `packages/components/src/icon-picker-control/index.jsx` | Wrapper: detection + routing + new prop API |
| Modify | `packages/components/src/icon-picker-control/editor.css` | Add SVG picker and skeleton styles |
| Modify | `packages/components/src/icon-picker-control/README.md` | Document new props and usage |

---

## Task 1: Extend `utils/api.js` with new REST API functions

**Files:**
- Modify: `packages/components/src/icon-picker-control/utils/api.js`

- [ ] **Step 1: Open the file and append the three new exports after the existing `getFontAwesomeIcons` export**

  The existing export must remain untouched. Add these three functions at the bottom of `packages/components/src/icon-picker-control/utils/api.js`:

  ```js
  /**
   * Fetch all registered icon sets from the wp-icons REST API.
   *
   * @return {Promise<Object>} Map of set name to set metadata, e.g. { "fa-solid": { prefix: "fas" } }
   */
  export const getIconSets = async () => {
  	const res = await fetch( '/yard/icons' );
  	if ( ! res.ok ) {
  		throw new Error( `Failed to fetch icon sets: ${ res.status }` );
  	}
  	return res.json();
  };

  /**
   * Search icons within a set via the wp-icons REST API.
   *
   * @param {string}      set    - The icon set identifier, e.g. "fa-solid".
   * @param {string}      query  - The search query.
   * @param {AbortSignal} signal - AbortController signal to cancel in-flight requests.
   *
   * @return {Promise<Array>} Array of icon objects: [{ name, set, prefix }, ...]
   */
  export const searchIcons = async ( set, query, signal ) => {
  	const res = await fetch(
  		`/yard/icons/${ encodeURIComponent( set ) }?q=${ encodeURIComponent( query ) }`,
  		{ signal }
  	);
  	if ( ! res.ok ) {
  		throw new Error( `Failed to search icons: ${ res.status }` );
  	}
  	return res.json();
  };

  /**
   * Fetch the raw SVG markup for a single icon.
   *
   * @param {string} set  - The icon set identifier, e.g. "fa-solid".
   * @param {string} name - The icon name, e.g. "house".
   *
   * @return {Promise<string>} Raw SVG markup string.
   */
  export const getIconSvg = async ( set, name ) => {
  	const res = await fetch(
  		`/yard/icons/${ encodeURIComponent( set ) }/${ name }`
  	);
  	if ( ! res.ok ) {
  		throw new Error( `Failed to fetch SVG for ${ set }/${ name }: ${ res.status }` );
  	}
  	return res.text();
  };
  ```

- [ ] **Step 2: Lint the file**

  Run: `npm run lint:js packages/components/src/icon-picker-control/utils/api.js`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/utils/api.js
  git commit -m "feat(icon-picker-control): add REST API helpers for wp-icons endpoints"
  ```

---

## Task 2: Create the SVG cache utility

**Files:**
- Create: `packages/components/src/icon-picker-control/utils/svg-cache.js`
- Create: `packages/components/src/icon-picker-control/utils/svg-cache.test.js`

- [ ] **Step 1: Create `utils/svg-cache.js`**

  ```js
  /**
   * Module-level SVG cache shared across all IconPickerControl instances.
   * Persists for the lifetime of the page session.
   *
   * @type {Map<string, string>}
   */
  const svgCache = new Map();

  /**
   * Retrieve a cached SVG string.
   *
   * @param {string} set  - Icon set identifier.
   * @param {string} name - Icon name.
   *
   * @return {string|undefined} Cached SVG string, or undefined if not cached.
   */
  export const getCachedSvg = ( set, name ) => svgCache.get( `${ set }/${ name }` );

  /**
   * Store an SVG string in the cache.
   *
   * @param {string} set  - Icon set identifier.
   * @param {string} name - Icon name.
   * @param {string} svg  - Raw SVG markup.
   */
  export const setCachedSvg = ( set, name, svg ) =>
  	svgCache.set( `${ set }/${ name }`, svg );

  /**
   * Check whether an SVG is already cached.
   *
   * @param {string} set  - Icon set identifier.
   * @param {string} name - Icon name.
   *
   * @return {boolean}
   */
  export const hasCachedSvg = ( set, name ) => svgCache.has( `${ set }/${ name }` );
  ```

- [ ] **Step 2: Create `utils/svg-cache.test.js`**

  ```js
  import { getCachedSvg, setCachedSvg, hasCachedSvg } from './svg-cache';

  describe( 'svg-cache', () => {
  	test( 'hasCachedSvg returns false for an uncached icon', () => {
  		expect( hasCachedSvg( 'fa-solid', 'missing-icon' ) ).toBe( false );
  	} );

  	test( 'getCachedSvg returns undefined for an uncached icon', () => {
  		expect( getCachedSvg( 'fa-solid', 'missing-icon' ) ).toBeUndefined();
  	} );

  	test( 'setCachedSvg stores an SVG and hasCachedSvg returns true', () => {
  		setCachedSvg( 'fa-solid', 'house', '<svg>house</svg>' );
  		expect( hasCachedSvg( 'fa-solid', 'house' ) ).toBe( true );
  	} );

  	test( 'getCachedSvg retrieves the stored SVG string', () => {
  		setCachedSvg( 'fa-solid', 'star', '<svg>star</svg>' );
  		expect( getCachedSvg( 'fa-solid', 'star' ) ).toBe( '<svg>star</svg>' );
  	} );

  	test( 'cache is keyed by set/name, different sets are stored separately', () => {
  		setCachedSvg( 'fa-solid', 'heart', '<svg>solid-heart</svg>' );
  		setCachedSvg( 'fa-brands', 'heart', '<svg>brands-heart</svg>' );
  		expect( getCachedSvg( 'fa-solid', 'heart' ) ).toBe( '<svg>solid-heart</svg>' );
  		expect( getCachedSvg( 'fa-brands', 'heart' ) ).toBe( '<svg>brands-heart</svg>' );
  	} );
  } );
  ```

- [ ] **Step 3: Run the tests**

  Run: `npx jest packages/components/src/icon-picker-control/utils/svg-cache.test.js --no-coverage`

  Expected: 5 tests pass.

- [ ] **Step 4: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/utils/svg-cache.js \
          packages/components/src/icon-picker-control/utils/svg-cache.test.js
  git commit -m "feat(icon-picker-control): add module-level SVG cache utility"
  ```

---

## Task 3: Create the `useIconSets` detection hook

**Files:**
- Create: `packages/components/src/icon-picker-control/hooks/use-icon-sets.js`

- [ ] **Step 1: Create the `hooks/` directory and `use-icon-sets.js`**

  ```js
  /**
   * WordPress dependencies
   */
  import { useState, useEffect } from '@wordpress/element';

  /**
   * Internal dependencies
   */
  import { getIconSets } from '../utils/api';

  /**
   * Detects whether the wp-icons REST API is available by fetching /yard/icons.
   *
   * Returns:
   *   - isLoading: true while the request is in flight (render nothing during this time)
   *   - isNewApiAvailable: true when /yard/icons returned at least one set
   *   - sets: the map of set name → metadata, e.g. { "fa-solid": { prefix: "fas" } }
   *
   * @return {{ sets: Object, isNewApiAvailable: boolean, isLoading: boolean }}
   */
  const useIconSets = () => {
  	const [ sets, setSets ] = useState( {} );
  	const [ isNewApiAvailable, setIsNewApiAvailable ] = useState( false );
  	const [ isLoading, setIsLoading ] = useState( true );

  	useEffect( () => {
  		getIconSets()
  			.then( ( data ) => {
  				if ( data && Object.keys( data ).length > 0 ) {
  					setSets( data );
  					setIsNewApiAvailable( true );
  				}
  			} )
  			.catch( () => {
  				// API not available — will fall back to FontAwesome picker silently.
  			} )
  			.finally( () => {
  				setIsLoading( false );
  			} );
  	}, [] );

  	return { sets, isNewApiAvailable, isLoading };
  };

  export default useIconSets;
  ```

- [ ] **Step 2: Lint the file**

  Run: `npm run lint:js packages/components/src/icon-picker-control/hooks/use-icon-sets.js`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/hooks/use-icon-sets.js
  git commit -m "feat(icon-picker-control): add useIconSets hook for API detection"
  ```

---

## Task 4: Extract `FontAwesomeIconPicker`

**Files:**
- Create: `packages/components/src/icon-picker-control/components/font-awesome-icon-picker.jsx`
- Modify: `packages/components/src/icon-picker-control/index.jsx` (remove FA logic, keep exports)

The FA picker is the **current** `IconPickerControl` function body. The only changes are import paths (the file moves from the root into `components/`).

- [ ] **Step 1: Create `components/font-awesome-icon-picker.jsx`**

  ```jsx
  /**
   * WordPress dependencies
   */
  import {
  	Popover,
  	SearchControl,
  } from '@wordpress/components';
  import { useDispatch } from '@wordpress/data';
  import { useState } from '@wordpress/element';
  import { __ } from '@wordpress/i18n';
  import { applyFilters } from '@wordpress/hooks';
  import { store as noticesStore } from '@wordpress/notices';

  /**
   * Internal dependencies
   */
  import DeleteIcon from './delete-icon.jsx';
  import IconResults from './icon-results.jsx';
  import { getFontAwesomeIcons } from '../utils/api';
  import { convertResponseToClassnames } from '../utils/helpers';

  const FontAwesomeIconPicker = ( {
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

  export default FontAwesomeIconPicker;
  ```

- [ ] **Step 2: Lint the new file**

  Run: `npm run lint:js packages/components/src/icon-picker-control/components/font-awesome-icon-picker.jsx`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/components/font-awesome-icon-picker.jsx
  git commit -m "feat(icon-picker-control): extract FontAwesomeIconPicker component"
  ```

---

## Task 5: Create `SvgIconResults`

**Files:**
- Create: `packages/components/src/icon-picker-control/components/svg-icon-results.jsx`

- [ ] **Step 1: Create `components/svg-icon-results.jsx`**

  Each result object has shape `{ name: string, set: string, svg: string|null }`. When `svg` is `null` (still loading), a skeleton placeholder is rendered. When `svg` is `'ERROR'`, a `×` placeholder is shown.

  ```jsx
  /**
   * WordPress dependencies
   */
  import { Button } from '@wordpress/components';
  import { __ } from '@wordpress/i18n';

  const SvgIconResults = ( { results, onIconClick } ) => {
  	return (
  		<div className="icon-picker-control-results-container">
  			{ results.map( ( { name, set, svg }, key ) => (
  				<div
  					className="icon-picker-control-icon-btn-container"
  					key={ key }
  				>
  					<Button
  						onClick={ () => svg && svg !== 'ERROR' && onIconClick( svg ) }
  						disabled={ ! svg || svg === 'ERROR' }
  						label={ name }
  					>
  						{ svg === null && (
  							<span className="icon-picker-control-svg-skeleton" aria-hidden="true" />
  						) }
  						{ svg === 'ERROR' && (
  							<span className="icon-picker-control-svg-error" aria-hidden="true">×</span>
  						) }
  						{ svg && svg !== 'ERROR' && (
  							<span dangerouslySetInnerHTML={ { __html: svg } } />
  						) }
  					</Button>
  				</div>
  			) ) }

  			{ ! results.length && (
  				<p>{ __( 'Er zijn geen iconen gevonden' ) }</p>
  			) }
  		</div>
  	);
  };

  export default SvgIconResults;
  ```

- [ ] **Step 2: Lint**

  Run: `npm run lint:js packages/components/src/icon-picker-control/components/svg-icon-results.jsx`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/components/svg-icon-results.jsx
  git commit -m "feat(icon-picker-control): add SvgIconResults grid component"
  ```

---

## Task 6: Create `SvgIconPicker`

**Files:**
- Create: `packages/components/src/icon-picker-control/components/svg-icon-picker.jsx`

- [ ] **Step 1: Create `components/svg-icon-picker.jsx`**

  ```jsx
  /**
   * WordPress dependencies
   */
  import {
  	SelectControl,
  	SearchControl,
  	Popover,
  } from '@wordpress/components';
  import { useDispatch } from '@wordpress/data';
  import { useState, useRef } from '@wordpress/element';
  import { __ } from '@wordpress/i18n';
  import { store as noticesStore } from '@wordpress/notices';

  /**
   * Internal dependencies
   */
  import DeleteIcon from './delete-icon.jsx';
  import SvgIconResults from './svg-icon-results.jsx';
  import { searchIcons, getIconSvg } from '../utils/api';
  import { getCachedSvg, setCachedSvg, hasCachedSvg } from '../utils/svg-cache';

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

  	const [ selectedSet, setSelectedSet ] = useState( setOptions[ 0 ]?.value ?? '' );
  	const [ searchInput, setSearchInput ] = useState( '' );
  	const [ results, setResults ] = useState( [] );
  	const [ isOpen, setIsOpen ] = useState( false );
  	const [ popoverAnchor, setPopoverAnchor ] = useState();

  	const abortControllerRef = useRef( null );
  	const debounceTimerRef = useRef( null );

  	const { createNotice } = useDispatch( noticesStore );

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
  	 * @return {Promise<Array>}
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
  		try {
  			const iconList = await searchIcons( set, query, signal );
  			const limited = iconList.slice( 0, MAX_RESULTS );

  			// Render immediately with skeleton placeholders.
  			setResults( limited.map( ( i ) => ( { ...i, svg: null } ) ) );
  			setIsOpen( true );

  			// Then resolve SVGs and update.
  			const withSvgs = await fetchSvgsForResults( limited );
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
  			performSearch( selectedSet, value, abortControllerRef.current.signal );
  		}, SEARCH_DEBOUNCE_MS );
  	};

  	const handleSetChange = ( value ) => {
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
  					dangerouslySetInnerHTML={ { __html: iconSVG } }
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
  ```

- [ ] **Step 2: Lint**

  Run: `npm run lint:js packages/components/src/icon-picker-control/components/svg-icon-picker.jsx`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/components/svg-icon-picker.jsx
  git commit -m "feat(icon-picker-control): add SvgIconPicker component with debounced search and SVG cache"
  ```

---

## Task 7: Rewrite `index.jsx` as the detection wrapper

**Files:**
- Modify: `packages/components/src/icon-picker-control/index.jsx`

This file now contains only the wrapper logic and the three public exports. The FA logic has moved to `font-awesome-icon-picker.jsx`.

- [ ] **Step 1: Replace the full contents of `index.jsx`**

  ```jsx
  /**
   * WordPress dependencies
   */
  import { Dropdown, ToolbarButton, ToolbarGroup } from '@wordpress/components';
  import { BlockControls } from '@wordpress/block-editor';
  import { __ } from '@wordpress/i18n';

  /**
   * Internal dependencies
   */
  import FontAwesomeIconPicker from './components/font-awesome-icon-picker.jsx';
  import SvgIconPicker from './components/svg-icon-picker.jsx';
  import useIconSets from './hooks/use-icon-sets.js';
  import './editor.css';

  /**
   * Core icon picker control. Automatically selects between the FontAwesome
   * picker and the new SVG-based picker depending on:
   *   1. Whether /yard/icons is reachable (detected on mount).
   *   2. Whether the consumer has provided an `onChangeSVG` callback.
   *
   * If either condition is false, the FontAwesome picker is rendered.
   *
   * @param {Object}   props
   * @param {Function} props.onChange           Called with FA class string when FA picker is used.
   * @param {string}   props.icon               Current FA class string (for legacy preview).
   * @param {boolean}  props.displayIconPreview  Show icon preview above search. Default true.
   * @param {boolean}  props.displayAsPopover    Show results in a popover. Default true.
   * @param {boolean}  props.displayDeleteIcon   Show delete button. Default false.
   * @param {Function} props.handleRemove        Called when delete button is clicked.
   * @param {Function} props.onChangeSVG         Called with raw SVG string when SVG picker is used.
   * @param {string}   props.iconSVG             Current SVG markup (for SVG preview).
   */
  export const IconPickerControl = ( {
  	onChange,
  	icon,
  	displayIconPreview = true,
  	displayAsPopover = true,
  	displayDeleteIcon = false,
  	handleRemove,
  	onChangeSVG,
  	iconSVG,
  } ) => {
  	const { sets, isNewApiAvailable, isLoading } = useIconSets();

  	if ( isLoading ) {
  		return null;
  	}

  	if ( isNewApiAvailable && onChangeSVG ) {
  		return (
  			<SvgIconPicker
  				sets={ sets }
  				onChangeSVG={ onChangeSVG }
  				iconSVG={ iconSVG }
  				displayIconPreview={ displayIconPreview }
  				displayAsPopover={ displayAsPopover }
  				displayDeleteIcon={ displayDeleteIcon }
  				handleRemove={ handleRemove }
  			/>
  		);
  	}

  	return (
  		<FontAwesomeIconPicker
  			onChange={ onChange }
  			icon={ icon }
  			displayIconPreview={ displayIconPreview }
  			displayAsPopover={ displayAsPopover }
  			displayDeleteIcon={ displayDeleteIcon }
  			handleRemove={ handleRemove }
  		/>
  	);
  };

  export const IconPickerControlInspector = ( {
  	icon,
  	onChange,
  	displayDeleteIcon = false,
  	handleRemove,
  	onChangeSVG,
  	iconSVG,
  } ) => {
  	return (
  		<IconPickerControl
  			icon={ icon }
  			onChange={ onChange }
  			displayIconPreview={ true }
  			displayAsPopover={ true }
  			displayDeleteIcon={ displayDeleteIcon }
  			handleRemove={ handleRemove }
  			onChangeSVG={ onChangeSVG }
  			iconSVG={ iconSVG }
  		/>
  	);
  };

  export const IconPickerControlToolbar = ( {
  	icon,
  	onChange,
  	onChangeSVG,
  	iconSVG,
  } ) => {
  	return (
  		<BlockControls>
  			<Dropdown
  				contentClassName="icon-picker-control-popover"
  				renderToggle={ ( { isOpen, onToggle } ) => (
  					<ToolbarGroup>
  						<ToolbarButton
  							onClick={ onToggle }
  							aria-expanded={ isOpen }
  						>
  							{ __( 'Kies icoon' ) }
  						</ToolbarButton>
  					</ToolbarGroup>
  				) }
  				renderContent={ () => (
  					<IconPickerControl
  						icon={ icon }
  						onChange={ onChange }
  						displayIconPreview={ false }
  						displayAsPopover={ false }
  						onChangeSVG={ onChangeSVG }
  						iconSVG={ iconSVG }
  					/>
  				) }
  			/>
  		</BlockControls>
  	);
  };
  ```

- [ ] **Step 2: Lint**

  Run: `npm run lint:js packages/components/src/icon-picker-control/index.jsx`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/index.jsx
  git commit -m "feat(icon-picker-control): replace index.jsx with detection wrapper, expose onChangeSVG/iconSVG props"
  ```

---

## Task 8: Extend `editor.css` with SVG picker styles

**Files:**
- Modify: `packages/components/src/icon-picker-control/editor.css`

- [ ] **Step 1: Append new styles to the end of `editor.css`**

  ```css
  /* SVG icon preview (replaces <i> for SVG-mode selected icon) */
  .icon-picker-control-preview-icon svg {
  	width: 3rem;
  	height: 3rem;
  	display: block;
  	margin-bottom: 1rem;
  }

  /* Skeleton placeholder for SVG cells that are still loading */
  .icon-picker-control-svg-skeleton {
  	display: block;
  	width: 2rem;
  	height: 2rem;
  	background-color: #e0e0e0;
  	border-radius: 2px;
  	animation: icon-picker-skeleton-pulse 1.2s ease-in-out infinite;
  }

  @keyframes icon-picker-skeleton-pulse {
  	0%, 100% { opacity: 1; }
  	50%       { opacity: 0.4; }
  }

  /* Error placeholder for failed SVG fetches */
  .icon-picker-control-svg-error {
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 2rem;
  	height: 2rem;
  	font-size: 1.2rem;
  	color: #757575;
  }

  /* Ensure SVGs inside result buttons scale correctly */
  .icon-picker-control-icon-btn-container svg {
  	width: 2rem;
  	height: 2rem;
  	display: block;
  }
  ```

- [ ] **Step 2: Lint CSS**

  Run: `npm run lint:scss packages/components/src/icon-picker-control/editor.css`

  Expected: no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/editor.css
  git commit -m "feat(icon-picker-control): add SVG picker and skeleton styles"
  ```

---

## Task 9: Update README

**Files:**
- Modify: `packages/components/src/icon-picker-control/README.md`

- [ ] **Step 1: Replace the full contents of `README.md`**

  ```markdown
  # Icon Picker Control

  Picks an icon in the block editor. Supports two modes:

  - **FontAwesome mode** (default, legacy): searches the FontAwesome GraphQL API and returns a CSS class string (e.g. `fa-solid fa-house`). Stored in the `icon` block attribute.
  - **SVG mode** (new): uses the `wp-icons` REST API (`/yard/icons`) to search sets of SVG icons and returns raw SVG markup. Stored in the `iconSVG` block attribute.

  Mode is selected automatically. If `/yard/icons` is reachable **and** the consumer provides an `onChangeSVG` callback, SVG mode is used. Otherwise FontAwesome mode is used. Existing consumers that only provide `onChange` are unaffected.

  ## Props

  | Prop | Type | Default | Description |
  |---|---|---|---|
  | `onChange` | `Function` | — | Called with FA class string (FontAwesome mode). |
  | `icon` | `string` | — | Current FA class string, used for the legacy icon preview. |
  | `displayIconPreview` | `boolean` | `true` | Show a preview of the selected icon above the search field. |
  | `displayAsPopover` | `boolean` | `true` | Show search results in a popover (vs. inline). |
  | `displayDeleteIcon` | `boolean` | `false` | Show a delete button below the search field. |
  | `handleRemove` | `Function` | — | Called when the delete button is clicked. |
  | `onChangeSVG` | `Function` | — | Called with raw SVG string (SVG mode). Opts the consumer into SVG mode when provided. |
  | `iconSVG` | `string` | — | Current SVG markup, used for the SVG icon preview. |

  ## New consumer example

  ```jsx
  <IconPickerControlInspector
      icon={ icon }
      iconSVG={ iconSVG }
      onChange={ ( v ) => setAttributes({ icon: v }) }
      onChangeSVG={ ( v ) => setAttributes({ iconSVG: v }) }
  />
  ```

  ### Block attribute registration

  ```js
  attributes: {
      icon:    { type: 'string', default: '' },
      iconSVG: { type: 'string', default: '' },
  }
  ```

  ### Frontend rendering (handle both old and new saved content)

  ```jsx
  { iconSVG
      ? <span dangerouslySetInnerHTML={{ __html: iconSVG }} />
      : icon && <i className={ icon } />
  }
  ```

  ## FontAwesome mode — filter

  To limit which FontAwesome family/style combinations appear, use this WordPress filter:

  ```js
  import { addFilter } from '@wordpress/hooks';

  addFilter( 'yard.fontawesome-family-styles', 'yard', () => [
      { family: 'classic', style: 'solid' },
      { family: 'classic', style: 'regular' },
  ] );
  ```

  ## SVG mode — how it works

  1. On mount, fetches `/yard/icons` to get available icon sets.
  2. Renders a set selector (`SelectControl`) populated with the returned sets.
  3. Search fires after 3 characters, debounced by 300 ms.
  4. Shows the first 10 results; fetches each icon's SVG eagerly (with skeleton placeholders while loading).
  5. SVGs are cached in a module-level `Map` for the page session — the same icon is never fetched twice.
  6. Selecting an icon calls `onChangeSVG` with the raw SVG string.
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add packages/components/src/icon-picker-control/README.md
  git commit -m "docs(icon-picker-control): update README for SVG mode and new props"
  ```

---

## Task 10: Manual verification in the browser

No automated component tests exist for this package. Verify the following manually in a WordPress site with the block editor open.

- [ ] **Scenario A — Legacy site (no wp-icons API)**

  1. Open a block that uses `IconPickerControlInspector` with only `onChange` wired up.
  2. Confirm the FontAwesome search field appears immediately.
  3. Type a search term. Confirm FA icon results appear in the popover.
  4. Click an icon. Confirm `onChange` is called and the `icon` attribute is saved.

- [ ] **Scenario B — New site, consumer not opted in**

  1. Ensure `/yard/icons` returns data on the site.
  2. Open a block that uses `IconPickerControlInspector` with only `onChange` wired up (no `onChangeSVG`).
  3. Confirm the FontAwesome picker appears (API available but consumer not opted in → FA path).

- [ ] **Scenario C — New site, consumer opted in**

  1. Ensure `/yard/icons` returns data on the site.
  2. Open a block that uses `IconPickerControlInspector` with both `onChange` and `onChangeSVG` wired up.
  3. Confirm the set selector dropdown appears populated with set names.
  4. Type fewer than 3 characters. Confirm no search fires.
  5. Type 3+ characters. Confirm skeleton placeholders appear, then SVG icons load in.
  6. Confirm only 10 results show at most.
  7. Click an icon. Confirm `onChangeSVG` is called, the popover closes, and the SVG preview appears.
  8. Confirm the delete button (if `displayDeleteIcon` is true and `iconSVG` is set) removes the icon.

- [ ] **Scenario D — Network failure during SVG fetch**

  1. In browser DevTools, throttle a specific `/yard/icons/{set}/{name}` request to fail.
  2. Confirm that cell shows a `×` placeholder and the rest of the grid loads correctly.
  3. Confirm no error notice appears (only search failures show the snackbar).

- [ ] **Scenario E — Network failure on sets fetch**

  1. In browser DevTools, block `/yard/icons` entirely.
  2. Confirm the component renders the FontAwesome picker (silent fallback, no error shown).
