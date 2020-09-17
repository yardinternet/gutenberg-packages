/**
 * External dependencies
 */
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	RangeControl,
	PanelBody,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	formatNonWpItemsKeyValues,
	formatFiltersNonWpSourcesKeyValues,
} from '../utils';

const remoteNonWpSource = applyFilters(
	'yard-blocks.listPostsRemoteNonWpSourcesItemsURL',
	[]
);

const remoteNonWpSourcesFilterURLS = applyFilters(
	'yard-blocks.listPostsRemoteNonWpSourcesFilterURLS',
	[]
);

function AOS( props ) {
	const {
		attributes,
		setAttributes,
		remoteNonWpSourcesKeyValue,
		remoteNonWpSources,
	} = props;
	const {
		postsToShow,
		isNonWpSourcesEnabled,
		selectedSubsites,
		nonWpostsToShow,
		nonWpostsOffset,
		selectedNonWpSource,
		topicsNonWpSources,
		themesNonWpSources,
		tagsNonWpSources,
		customNonWpSelection,
		selectedNonWpPosts,
		searchNonWpSelection,
		searchedNonWpPosts,
	} = attributes;

	const [ remoteNonWpItems, setRemoteNonWpItems ] = useState( [] );

	const [
		subsitesNonWpSourcesKeyValues,
		setSubsitesNonWpSourcesKeyValues,
	] = useState( [] );

	const [
		topicsNonWpSourcesKeyValues,
		setTopicsNonWpSourcesKeyValues,
	] = useState( [] );

	const [
		themesNonWpSourcesKeyValues,
		setThemesNonWpSourcesKeyValues,
	] = useState( [] );

	const [
		tagsNonWpSourcesKeyValues,
		setTagsNonWpSourcesKeyValues,
	] = useState( [] );

	const [ stateSearchedItems, setStateSearchedItems ] = useState( [] );

	/**
	 * useEffect for preparing filters for filtering non wp posts used in inspector
	 */
	useEffect( () => {
		if ( ! remoteNonWpSources.length ) return;
		prepareFilters();
	}, [ remoteNonWpSources ] );

	/**
	 * useEffect for fetching items from non wp posts used in inspector
	 */
	useEffect( () => {
		if ( ! remoteNonWpSource.length ) return;
		getFetchedNonWpItems();
	}, [ remoteNonWpSource ] );

	/**
	 * Fetch items from non wp posts used in inspector
	 */
	useEffect( () => {
		getFetchedNonWpItems();
	}, [
		themesNonWpSources,
		topicsNonWpSources,
		tagsNonWpSources,
		nonWpostsToShow,
	] );

	/**
	 * Preparing filters for filtering non wp posts used in inspector
	 */
	const prepareFilters = async () => {
		const topics = await fetchFilters( 'topics' );
		const topicsKeyValues = formatFiltersNonWpSourcesKeyValues(
			'topics',
			topics
		);
		setTopicsNonWpSourcesKeyValues( topicsKeyValues );

		const themes = await fetchFilters( 'themes' );
		const themesKeyValues = formatFiltersNonWpSourcesKeyValues(
			'themes',
			themes
		);
		setThemesNonWpSourcesKeyValues( themesKeyValues );

		const tags = await fetchFilters( 'tags' );
		const tagsKeyValues = formatFiltersNonWpSourcesKeyValues(
			'tags',
			tags
		);
		setTagsNonWpSourcesKeyValues( tagsKeyValues );

		const subsites = await fetchFilters( 'subsites' );
		const subsitesKeyValues = formatFiltersNonWpSourcesKeyValues(
			'subsites',
			subsites
		);
		setSubsitesNonWpSourcesKeyValues( subsitesKeyValues );
	};

	/**
	 * Fetch items from AOS repository
	 */
	const fetchNonWpItems = async () => {
		const query = buildQuery();

		const urlObject = remoteNonWpSource.filter( ( item ) => {
			return item.name === 'articles';
		} );

		const fetchedNonWpItems = await fetch(
			`${ urlObject[ 0 ].url }?per-page=${ nonWpostsToShow }${ query }` // checken of gevuld
		);

		const response = await fetchedNonWpItems.json();

		return response.articles;
	};

	/**
	 * Build query for usage on the AOS repository endpoint
	 */
	const buildQuery = () => {
		let query = '';

		if ( !! themesNonWpSources ) {
			// eslint-disable-next-line
			themesNonWpSources.map( ( item ) => {
				query = query + `&theme[]=${ item.label }`;
			} );
		}

		if ( !! topicsNonWpSources ) {
			// eslint-disable-next-line
			topicsNonWpSources.map( ( item ) => {
				query = query + `&topic[]=${ item.label }`;
			} );
		}

		if ( !! tagsNonWpSources ) {
			// eslint-disable-next-line
			tagsNonWpSources.map( ( item ) => {
				query = query + `&tag[]=${ item.label }`;
			} );
		}

		if ( !! selectedSubsites ) {
			// eslint-disable-next-line
			selectedSubsites.map( ( item ) => {
				query = query + `&subsite[]=${ item.label }`;
			} );
		}

		return query;
	};

	/**
	 * Search the AOS repository
	 *
	 * @param {string} slug
	 */
	const searchNonWpItems = async ( slug ) => {
		const urlObject = remoteNonWpSource.filter( ( item ) => {
			return item.name === 'search';
		} );

		const foundItem = await fetch(
			`${ urlObject[ 0 ].url }?q=${ slug }&per-page=${ postsToShow }`
		); // checken of gevuld

		const response = await foundItem.json();

		return response.results;
	};

	const loadOptions = async ( inputValue, callback ) => {
		if ( ! inputValue ) {
			return;
		}

		const data = await searchNonWpItems( inputValue );

		if ( data ) {
			transformPosts( data );
			callback( createOptions( data ) );
		}
	};

	const createOptions = ( data ) => {
		return data.map( ( item ) => {
			return { value: item.slug, label: item.title };
		} );
	};

	const transformPosts = ( data = [] ) => {
		setStateSearchedItems(
			data.map( ( item ) => {
				return { value: item.slug, label: item.title };
			} )
		);

		return stateSearchedItems;
	};

	const handleAsyncSelection = async ( value ) => {
		setAttributes( {
			searchedNonWpPosts: value,
		} );
		setStateSearchedItems( {} );
	};

	/**
	 * fetch the filters from the AOS repository
	 *
	 * @param {string} filter
	 */
	const fetchFilters = async ( filter ) => {
		const match = remoteNonWpSourcesFilterURLS.filter( ( value ) => {
			return value.name === filter;
		} );

		const fetchedFilters = await fetch( match[ 0 ].url );
		const response = await fetchedFilters.json();

		return response;
	};

	/**
	 * Get fetched items from the AOS repository
	 */
	const getFetchedNonWpItems = async () => {
		const items = await fetchNonWpItems();
		setRemoteNonWpItems( formatNonWpItemsKeyValues( items ) );
	};

	/**
	 * Handle the 'remote non wp sources' select
	 *
	 * @param {Object} value
	 */
	const handleRemoteNonWpSourceSelection = ( value ) => {
		setAttributes( {
			selectedNonWpSource:
				value !== null
					? { value: value.value, label: value.label }
					: { value: '0', label: __( 'Selecteer een bron' ) },
			isNonWpSourcesEnabled: value !== null ? true : false,
		} );
	};

	return (
		<>
			<PanelBody title={ __( 'Bron' ) }>
				<Select
					isClearable={ true }
					isMulti={ false }
					value={ selectedNonWpSource }
					onChange={ handleRemoteNonWpSourceSelection }
					options={ remoteNonWpSourcesKeyValue }
					className="yard-sub-control"
				/>
				{ isNonWpSourcesEnabled && ! searchNonWpSelection && (
					<>
						<p className={ 'yard-label' }>
							{ __( 'Kies de subsites' ) }
						</p>
						<Select
							isClearable={ true }
							isMulti={ true }
							placeholder={ __( 'Kies subsites' ) }
							value={ selectedSubsites }
							onChange={ ( subsites ) =>
								setAttributes( {
									selectedSubsites: subsites,
								} )
							}
							options={ subsitesNonWpSourcesKeyValues }
							className="yard-sub-control"
						/>
						<p className={ 'yard-label' }>
							{ __( 'Kies topics om te filteren' ) }
						</p>
						<Select
							isClearable={ true }
							isMulti={ true }
							placeholder={ __( 'Kies topics' ) }
							value={ topicsNonWpSources }
							onChange={ ( topics ) =>
								setAttributes( {
									topicsNonWpSources: topics,
								} )
							}
							options={ topicsNonWpSourcesKeyValues }
							className="yard-sub-control"
						/>
						<p className={ 'yard-label' }>
							{ __( "Kies thema's om te filteren" ) }
						</p>
						<Select
							isClearable={ true }
							isMulti={ true }
							placeholder={ __( "Kies thema's" ) }
							value={ themesNonWpSources }
							onChange={ ( themes ) =>
								setAttributes( {
									themesNonWpSources: themes,
								} )
							}
							options={ themesNonWpSourcesKeyValues }
							className="yard-sub-control"
						/>
						<p className={ 'yard-label' }>
							{ __( 'Kies tags om te filteren' ) }
						</p>
						<Select
							isClearable={ true }
							isMulti={ true }
							placeholder={ __( 'Kies tags' ) }
							value={ tagsNonWpSources }
							onChange={ ( tags ) =>
								setAttributes( {
									tagsNonWpSources: tags,
								} )
							}
							options={ tagsNonWpSourcesKeyValues }
							className="yard-sub-control"
						/>
						{ ! customNonWpSelection && (
							<>
								<RangeControl
									key="query-controls-range-control"
									label={ __( 'Aantal posts' ) }
									value={ nonWpostsToShow }
									onChange={ ( value ) =>
										setAttributes( {
											nonWpostsToShow: value,
										} )
									}
									min={ 0 }
									max={ 999 }
									className="yard-sub-control"
								/>
								<RangeControl
									key="query-controls-range-control"
									label={ __( 'Offset' ) }
									value={ nonWpostsOffset }
									onChange={ ( value ) =>
										setAttributes( {
											nonWpostsOffset: value,
										} )
									}
									min={ 0 }
									max={ 999 }
									className="yard-sub-control"
								/>
							</>
						) }
					</>
				) }
			</PanelBody>
			{ ! searchNonWpSelection && nonWpostsOffset === 0 && (
				<PanelBody
					title={ __( 'Handmatige selectie' ) }
					initialOpen={ false }
				>
					<>
						<CheckboxControl
							label={ __( 'Handmatige selectie' ) }
							checked={ customNonWpSelection }
							onChange={ ( checked ) =>
								setAttributes( {
									customNonWpSelection: checked,
								} )
							}
						/>
						{ customNonWpSelection && (
							<div style={ { marginBottom: 20 } }>
								<Select
									isMulti
									value={ selectedNonWpPosts }
									onChange={ ( val ) =>
										setAttributes( {
											selectedNonWpPosts:
												val === null ? [] : val,
										} )
									}
									options={ remoteNonWpItems }
								/>
							</div>
						) }
					</>
				</PanelBody>
			) }
			{ ! customNonWpSelection && (
				<PanelBody
					title={ __( 'Zoeken' ) }
					initialOpen={ searchNonWpSelection }
				>
					<>
						<CheckboxControl
							label={ __( 'Zoeken' ) }
							checked={ searchNonWpSelection }
							onChange={ ( checked ) =>
								setAttributes( {
									searchNonWpSelection: checked,
								} )
							}
						/>
						{ searchNonWpSelection && (
							<div style={ { marginBottom: 20 } }>
								<p>
									{ __(
										'Vul je zoekterm in om in de repo te zoeken.'
									) }
								</p>
								<AsyncSelect
									isMulti
									value={ searchedNonWpPosts }
									cacheOptions
									defaultOptions={ stateSearchedItems }
									onChange={ ( value ) => {
										handleAsyncSelection( value );
									} }
									loadOptions={ debounce( loadOptions, 500 ) }
								/>
							</div>
						) }
					</>
				</PanelBody>
			) }
		</>
	);
}

export default AOS;
