/**
 * External dependencies
 */
import { map, countBy, debounce } from 'lodash';
import { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
	Spinner,
	RangeControl,
	QueryControls,
	ToggleControl,
	CheckboxControl,
	PanelBody,
	TextControl,
	Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	populateTaxonomyValues,
	populateExternalTaxonomyValues,
	filterRemovedTerms,
	getValueLabelObjectByValue,
	hasSupportsNumberPerRow,
	taxInSelectedSource,
	hasPostypeTaxonomy,
	findSourceByBaseUrl,
	filterStickyPostSelectOptions,
	filterExcludedPostsSelectOptions,
} from '../utils';
import { fetchSources, searchListPosts } from '../api';
import SelectPostTypeControl from './select-posttype-control';
import SelectCustomViewsControl from './select-custom-views-control';
import ColumnSize from './column-size';
import SourceTypeControl from './source-type-control';

const sources = applyFilters( 'yard-blocks.listPostsRemoteSources', [] );

/**
 * Use custom selection component with search functionality
 */
const searchCustomSelection = applyFilters(
	'yard-blocks.listPostsSearchCustomSelection',
	false
);

/**
 * Retrieve component from project theme
 */
const ProjectComponent = applyFilters(
	'yard-blocks.listPostsProjectComponent',
	false
);

/**
 * Retrieve select options for non wp sources
 */
const remoteNonWpSources = applyFilters(
	'yard-blocks.listPostsRemoteNonWpSources',
	[]
);

const errorFetchRemoteSources = __( 'data kan niet worden opgehaald' );

const SortableMultiValue = SortableElement( ( props ) => (
	<components.MultiValue { ...props } />
) );
const SortableMultiValueLabel = SortableHandle( ( props ) => (
	<components.MultiValueLabel { ...props } />
) );
const SortableSelect = SortableContainer( Select );
const AsyncSortableSelect = SortableContainer( AsyncSelect );

function Inspector( props ) {
	const {
		attributes,
		setAttributes,
		posts,
		setPostType,
		postTypes,
		customViews,
		taxonomies,
		externalTaxonomies,
		allTaxonomyTerms,
	} = props;
	const {
		stickyPostSelection,
		selectedStickyPostID,
		customID,
		customSelection,
		keepCustomSelectionOrder,
		selectedPosts,
		excludedPosts,
		order,
		orderBy,
		postType,
		postsToShow,
		postsOffset,
		displayDate,
		displayExcerpt,
		displayFeaturedImage,
		taxonomyTerms,
		externalTaxonomyTerms,
		numberPerRow,
		numberPerRowLg,
		numberPerRowSm,
		numberPerRowXs,
		selectedSources,
		isNonWpSourcesEnabled,
		isMultipleSourcesEnabled,
		randomOrder,
	} = attributes;

	const [ taxoResolved, setTaxoResolved ] = useState( false );
	const [ supportsNumberPerRow, setSupportsNumberPerRow ] = useState( false );
	const [
		supportsNumberPerRowInitialOpen,
		setSupportsNumberPerRowInitialOpen,
	] = useState( false );
	const [ supportsCustomAnchorID, setSupportsCustomAnchorID ] =
		useState( false );
	const [ remotePostsOptions, setRemotePostOptions ] = useState( [] );
	const [ failedRemoteEndpoints, setFailedRemoteEndpoints ] = useState( [] );
	const [ allExternalTaxonomyTerms, setAllExternalTaxonomyTerms ] = useState(
		[]
	);
	const [ stateSearchedItems, setStateSearchedItems ] = useState( [] );

	const excludedCount =
		excludedPosts && excludedPosts.length
			? `(${ excludedPosts.length })`
			: '';

	const postSelectionCount =
		customSelection && selectedPosts.length
			? `(${ selectedPosts.length })`
			: '';

	const renderStickyPostPanel =
		! customSelection &&
		!! posts.length &&
		! isNonWpSourcesEnabled &&
		! isMultipleSourcesEnabled;

	/**
	 * hasSupportsNumberPerRow
	 */
	useEffect( () => {
		if (
			hasSupportsNumberPerRow( {
				numberPerRow,
				numberPerRowLg,
				numberPerRowSm,
				numberPerRowXs,
			} )
		) {
			setSupportsNumberPerRow( true );
		}
	}, [] );

	useEffect( () => {
		if ( externalTaxonomies.length ) {
			const mappedExternalTaxonomyTerms = map(
				externalTaxonomies,
				( taxonomy ) => {
					return {
						name: taxonomy.panelName,
						slug: taxonomy.name,
						source: taxonomy.source,
						terms: taxonomy.terms,
					};
				}
			);
			setAllExternalTaxonomyTerms( mappedExternalTaxonomyTerms );
		}
	}, [ externalTaxonomies ] );

	/**
	 * Taxonomies
	 */
	useEffect( () => {
		if ( allTaxonomyTerms.length ) {
			const resolving = countBy(
				allTaxonomyTerms,
				( taxonomy ) => taxonomy.resolving
			);

			/**
			 * All taxonomies are retrieved by getEntityRecords these actions happens async
			 * wait untill all term requests are resolved
			 */
			if (
				! taxoResolved &&
				resolving.true === allTaxonomyTerms.length
			) {
				setTaxoResolved( true );
			}
		}
	} );

	/**
	 * Only set attributes when taxoResolve changes to filter removedTerms
	 */
	useEffect( () => {
		if ( taxoResolved ) {
			setAttributes( {
				taxonomyTerms: filterRemovedTerms(
					allTaxonomyTerms,
					taxonomyTerms
				),
			} );
		}
	}, [ taxoResolved ] );

	/**
	 *
	 * @param {Array} urls
	 */
	const createUrlsObj = ( urls = [] ) => {
		return urls.reduce( ( acc, curr ) => {
			return acc.concat(
				curr.slugs.map( ( type, index ) => {
					const { title } = findSourceByBaseUrl(
						sources,
						curr.baseUrl
					)
						? findSourceByBaseUrl( sources, curr.baseUrl )
						: '';

					const urlObject = {
						title,
						url: `${ curr.baseUrl }${ type }`,
						baseUrl: curr.baseUrl,
						slug: type,
					};

					if ( curr.hasOwnProperty( 'taxonomies' ) ) {
						urlObject.taxonomies = curr.taxonomies[ index ];
					}

					return urlObject;
				} )
			);
		}, [] );
	};

	/**
	 * Fetches the remotePosts and format them into option key/pair values
	 */
	const formatRemotePostsKeyValues = async () => {
		const urlObjects = createUrlsObj( selectedSources );
		const results = await fetchSources( urlObjects, externalTaxonomyTerms );

		if ( results.errors.length ) {
			setFailedRemoteEndpoints( results.errors );
		}

		const keyValues = results.posts.reduce( ( acc, curr ) => {
			const option = curr.map( ( item ) => {
				const { siteTitle, title } = JSON.parse(
					item._yb_list_posts_option
				);

				return {
					label: `${ siteTitle }: ${ title } `,
					value: item._yb_list_posts_option,
				};
			} );

			return acc.concat( option );
		}, [] );

		setRemotePostOptions( keyValues );
	};

	useEffect( () => {
		if ( ! sources.length ) return;
		formatRemotePostsKeyValues();
	}, [ selectedSources, externalTaxonomyTerms ] );

	const setTermsByTaxonomySlug = ( val, taxonomy ) => {
		setAttributes( {
			taxonomyTerms: {
				...taxonomyTerms,
				...{ [ taxonomy ]: val.map( ( item ) => item.value ) },
			},
		} );
	};

	const setTermsByExternalTaxonomySlug = ( val, taxonomy ) => {
		setAttributes( {
			externalTaxonomyTerms: {
				...externalTaxonomyTerms,
				...{ [ taxonomy ]: val.map( ( item ) => item.value ) },
			},
		} );
	};

	/**
	 * @param {Array} newSelectedSources
	 */
	const selectedSourcesOnChange = ( newSelectedSources = [] ) => {
		//  Example newSelectedSources
		// [
		// 	{
		// 		baseUrl: 'https://www.valente.nl/wp-json/wp/v2/',
		// 		slugs: [ 'pages', 'faq' ],
		// 	},
		// ];

		setAttributes( {
			selectedSources: newSelectedSources,
		} );
	};

	const shouldRenderCustomSelectionSelect = () => {
		if ( ! customSelection ) return false;
		if ( searchCustomSelection && postType !== 'external' ) return false;
		if ( ! posts.length && ! remotePostsOptions.length ) return false;

		return true;
	};

	const shouldRenderSearchCustomSelectionSelect = () => {
		if ( ! customSelection ) return false;
		if ( postType === 'external' || ! searchCustomSelection ) return false; // Search does not work for external sources.

		return true;
	};

	const shouldRenderCustomSelectionSpinner = () => {
		if ( ! customSelection ) return false;
		if ( !! posts.length || !! remotePostsOptions.length ) return false;

		return true;
	};

	/**
	 * Load options for async select.
	 */
	const loadOptions = async ( inputValue, callback ) => {
		if ( ! inputValue || ! postType ) {
			return;
		}

		const data = await searchListPosts(
			postType !== 'attachment' ? postType : 'media',
			'wp/v2/',
			inputValue
		);

		if ( data ) {
			transformPostsToState( data );
			callback( createOptions( data ) );
		}
	};

	const transformPostsToState = ( data = [] ) => {
		setStateSearchedItems(
			data.map( ( item ) => {
				return { value: item.id, label: item.title.rendered };
			} )
		);
	};

	const createOptions = ( data ) => {
		return data.map( ( item ) => {
			return { value: item.id, label: item.title.rendered };
		} );
	};

	/**
	 * Helper function to change the position of the posts that is moved in the sortable select
	 */
	const arrayMove = ( array, from, to ) => {
		const slicedArray = array.slice();
		slicedArray.splice(
			to < 0 ? array.length + to : to,
			0,
			slicedArray.splice( from, 1 )[ 0 ]
		);
		return slicedArray;
	};

	const onChangeSortableSelect = ( value ) => {
		setAttributes( {
			selectedPosts: value ? value : [],
		} );
	};

	/**
	 * Function is called when an user change the order in the sortable select
	 */
	const onSortEndSortableSelect = ( { oldIndex, newIndex } ) => {
		const newValue = arrayMove( selectedPosts, oldIndex, newIndex );

		setAttributes( {
			selectedPosts: newValue,
		} );
	};

	return (
		<InspectorControls>
			{ !! remoteNonWpSources.length && ! postType && ProjectComponent && (
				<ProjectComponent
					{ ...{
						remoteNonWpSources,
						...props,
					} }
				/>
			) }
			{ ! isNonWpSourcesEnabled && (
				<PanelBody
					title={ __( 'Instellingen' ) }
					initialOpen={ ! remoteNonWpSources.length }
				>
					<SelectPostTypeControl
						{ ...{ setPostType, postTypes, postType, ...props } }
					/>
					{ postType && (
						<Fragment>
							<QueryControls
								{ ...{ orderBy, order, postsToShow } }
								numberOfItems={ postsToShow }
								onOrderChange={ ( value ) =>
									setAttributes( { order: value } )
								}
								onOrderByChange={ ( value ) =>
									setAttributes( { orderBy: value } )
								}
								onNumberOfItemsChange={ ( value ) =>
									setAttributes( {
										postsToShow: value,
										numberPerRow:
											numberPerRow <= value
												? numberPerRow
												: value,
										numberPerRowSm:
											numberPerRowSm <= value
												? numberPerRowSm
												: value,
										numberPerRowXs:
											numberPerRowXs <= value
												? numberPerRowXs
												: value,
									} )
								}
							/>
							{ ! customSelection && ! stickyPostSelection && (
								<>
									<RangeControl
										key="query-controls-range-control"
										label={ __( 'Afwijking' ) }
										value={ postsOffset }
										onChange={ ( value ) =>
											setAttributes( {
												postsOffset: value,
											} )
										}
										min={ 0 }
										max={ 30 }
									/>
									<ToggleControl
										label={ __( 'Willekeurige volgorde' ) }
										checked={ randomOrder }
										onChange={ () =>
											setAttributes( {
												randomOrder: ! randomOrder,
											} )
										}
									/>
								</>
							) }
						</Fragment>
					) }
				</PanelBody>
			) }

			{ renderStickyPostPanel && (
				<PanelBody
					title={ __( 'Klevend bericht' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						label={ __( 'Klevend bericht' ) }
						checked={ stickyPostSelection }
						onChange={ ( checked ) =>
							setAttributes( {
								stickyPostSelection: checked,
								selectedStickyPostID: 0,
							} )
						}
					/>

					{ stickyPostSelection && !! posts.length && (
						<div style={ { marginBottom: 20 } }>
							<Select
								value={ getValueLabelObjectByValue(
									posts,
									selectedStickyPostID
								) }
								onChange={ ( { value } ) => {
									setAttributes( {
										selectedStickyPostID: value,
									} );
								} }
								options={ filterStickyPostSelectOptions(
									excludedPosts,
									posts.concat( remotePostsOptions )
								) }
							/>
						</div>
					) }

					{ stickyPostSelection && posts.length === 0 && (
						<Fragment>
							<Spinner />
							<span>{ __( 'Data ophalen' ) }...</span>
						</Fragment>
					) }
				</PanelBody>
			) }

			{ !! sources.length && ! isNonWpSourcesEnabled && (
				<PanelBody title={ __( 'Externe bronnen' ) }>
					<div style={ { display: 'block', width: '100%' } }>
						<ToggleControl
							checked={ isMultipleSourcesEnabled }
							label={ __( 'Selecteer externe bronnen' ) }
							onChange={ () =>
								setAttributes( {
									isMultipleSourcesEnabled:
										! isMultipleSourcesEnabled,
									stickyPostSelection: false,
									selectedStickyPostID: 0,
								} )
							}
						/>
					</div>
					{ isMultipleSourcesEnabled && (
						<div
							style={ {
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
							} }
						>
							{ !! failedRemoteEndpoints.length && (
								<div
									style={ { display: 'flex', color: 'red' } }
								>
									<Dashicon
										style={ { marginRight: '10px' } }
										icon="flag"
									/>
									<p>{ `${ failedRemoteEndpoints
										.map( ( item ) => item.title )
										.join(
											','
										) } ${ errorFetchRemoteSources }` }</p>
								</div>
							) }
							<SourceTypeControl
								onChangeCallback={ selectedSourcesOnChange }
								selectedSources={ selectedSources }
								failedRemoteEndpoints={ failedRemoteEndpoints }
								sources={ sources }
							/>
						</div>
					) }
				</PanelBody>
			) }

			{ supportsCustomAnchorID && (
				<PanelBody
					title={ __( 'Unieke ID / Anchor' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Unieke ID / Anchor' ) }
						value={ customID }
						onChange={ ( value ) =>
							setAttributes( { customID: value } )
						}
						type="string"
					/>
				</PanelBody>
			) }

			{ supportsNumberPerRow && (
				<PanelBody
					title={ __( 'Kolommen per rij' ) }
					initialOpen={ supportsNumberPerRowInitialOpen }
				>
					<Fragment>
						<ColumnSize
							label={ __( 'Desktop' ) }
							beforeIcon="desktop"
							value={ numberPerRowLg }
							onChange={ ( val ) => {
								setAttributes( {
									numberPerRowLg:
										val <= postsToShow ? val : postsToShow,
								} );
							} }
						/>
						<ColumnSize
							label={ __( 'Laptop' ) }
							beforeIcon="laptop"
							value={ numberPerRow }
							onChange={ ( val ) => {
								setAttributes( {
									numberPerRow:
										val <= postsToShow ? val : postsToShow,
								} );
							} }
						/>
						<ColumnSize
							label={ __( 'Tablet' ) }
							beforeIcon="tablet"
							value={ numberPerRowSm }
							onChange={ ( val ) => {
								setAttributes( {
									numberPerRowSm:
										val <= postsToShow ? val : postsToShow,
								} );
							} }
						/>
						<ColumnSize
							label={ __( 'Mobiel' ) }
							beforeIcon="smartphone"
							value={ numberPerRowXs }
							onChange={ ( val ) => {
								setAttributes( {
									numberPerRowXs:
										val <= postsToShow ? val : postsToShow,
								} );
							} }
						/>
					</Fragment>
				</PanelBody>
			) }

			{ !! allExternalTaxonomyTerms.length &&
				map( allExternalTaxonomyTerms, ( taxonomy ) => {
					if ( ! taxInSelectedSource( selectedSources, taxonomy ) ) {
						return null;
					}

					const values = populateExternalTaxonomyValues(
						taxonomy.terms,
						externalTaxonomyTerms[ taxonomy.slug ]
					);

					return (
						<PanelBody
							key={ taxonomy.slug }
							title={ taxonomy.name }
							initialOpen={ false }
						>
							{ taxonomy.terms && !! taxonomy.terms.length && (
								<Select
									value={ values }
									onChange={ ( value ) =>
										setTermsByExternalTaxonomySlug(
											value,
											taxonomy.slug
										)
									}
									isMulti={ true }
									options={ taxonomy.terms.map(
										( item ) => ( {
											label: item.name,
											value: item.slug,
										} )
									) }
								/>
							) }
						</PanelBody>
					);
				} ) }

			{ taxoResolved &&
				map( allTaxonomyTerms, ( taxonomy ) => {
					if (
						! hasPostypeTaxonomy( taxonomies, taxonomy, postType )
					) {
						return null;
					}

					const values = populateTaxonomyValues(
						taxonomy.data,
						taxonomyTerms[ taxonomy.slug ]
					);

					const labelCount = values.length
						? `(${ values.length })`
						: '';

					return (
						<PanelBody
							key={ taxonomy.slug }
							title={ `${ taxonomy.name } ${ labelCount }` }
							initialOpen={ false }
						>
							{ taxonomy.data && !! taxonomy.data.length && (
								<Select
									value={ values }
									onChange={ ( value ) =>
										setTermsByTaxonomySlug(
											value,
											taxonomy.slug
										)
									}
									isMulti={ true }
									options={ taxonomy.data.map( ( item ) => ( {
										label: item.name,
										value: item.slug,
									} ) ) }
								/>
							) }
						</PanelBody>
					);
				} ) }

			{ postType && ! stickyPostSelection && (
				<PanelBody
					title={ __( 'Handmatige selectie' ) + postSelectionCount }
					initialOpen={ customSelection }
				>
					<CheckboxControl
						label={ __( 'Handmatige selectie' ) }
						checked={ customSelection }
						onChange={ ( checked ) =>
							setAttributes( { customSelection: checked } )
						}
					/>
					{ shouldRenderCustomSelectionSelect() && (
						<div style={ { marginBottom: 20 } }>
							<SortableSelect
								axis="xy"
								closeMenuOnSelect={ false }
								components={ {
									MultiValue: SortableMultiValue,
									MultiValueLabel: SortableMultiValueLabel,
								} }
								isMulti
								isOptionDisabled={ () =>
									selectedPosts.length >= postsToShow
								}
								onChange={ onChangeSortableSelect }
								onSortEnd={ onSortEndSortableSelect }
								options={ posts.concat( remotePostsOptions ) }
								useDragHandle
								value={ selectedPosts }
							/>
						</div>
					) }
					{ shouldRenderSearchCustomSelectionSelect() && (
						<div style={ { marginBottom: 20 } }>
							<p>{ __( 'Vul je zoekterm in.' ) }</p>
							<AsyncSortableSelect
								axis="xy"
								cacheOptions={ false }
								closeMenuOnSelect={ false }
								components={ {
									MultiValue: SortableMultiValue,
									MultiValueLabel: SortableMultiValueLabel,
								} }
								defaultOptions={ stateSearchedItems }
								isMulti
								isOptionDisabled={ () =>
									selectedPosts.length >= postsToShow
								}
								loadOptions={ debounce( loadOptions, 200 ) }
								onChange={ onChangeSortableSelect }
								onSortEnd={ onSortEndSortableSelect }
								options={ posts.concat( remotePostsOptions ) }
								useDragHandle
								value={ selectedPosts }
							/>
						</div>
					) }
					{ ( shouldRenderCustomSelectionSelect() ||
						shouldRenderSearchCustomSelectionSelect() ) && (
						<CheckboxControl
							label={ __( 'Behoud volgorde' ) }
							checked={ keepCustomSelectionOrder }
							onChange={ ( checked ) =>
								setAttributes( {
									keepCustomSelectionOrder: checked,
								} )
							}
							help={ __(
								'Versleep de labels om de volgorde van de berichten te veranderen.'
							) }
						/>
					) }
					{ shouldRenderCustomSelectionSpinner() && (
						<div>
							<Spinner />
							<span>{ __( 'Data ophalen' ) }...</span>
						</div>
					) }
				</PanelBody>
			) }

			{ postType &&
				! customSelection &&
				!! ( posts.length || !! remotePostsOptions.length ) && (
					<PanelBody
						title={ __( 'Uitsluiten' ) + `${ excludedCount }` }
						initialOpen={ false }
					>
						<div style={ { marginBottom: 20 } }>
							<p>
								{ ' ' }
								{ __(
									'Berichten die niet getoond mogen worden'
								) }{ ' ' }
							</p>
							<Select
								isMulti
								value={ excludedPosts }
								onChange={ ( val ) =>
									setAttributes( { excludedPosts: val } )
								}
								options={ filterExcludedPostsSelectOptions(
									stickyPostSelection,
									selectedStickyPostID,
									posts.concat( remotePostsOptions )
								) }
							/>
						</div>
					</PanelBody>
				) }

			<PanelBody title={ __( 'Weergave' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Toon datum' ) }
					checked={ displayDate }
					onChange={ () =>
						setAttributes( { displayDate: ! displayDate } )
					}
				/>
				<ToggleControl
					label={ __( 'Toon samenvatting' ) }
					checked={ displayExcerpt }
					onChange={ () =>
						setAttributes( { displayExcerpt: ! displayExcerpt } )
					}
				/>
				<ToggleControl
					label={ __( 'Toon uitgelichte afbeelding' ) }
					checked={ displayFeaturedImage }
					onChange={ () =>
						setAttributes( {
							displayFeaturedImage: ! displayFeaturedImage,
						} )
					}
				/>
			</PanelBody>

			{ !! customViews && ( postType || isNonWpSourcesEnabled ) && (
				<PanelBody title={ __( 'Sjabloon' ) } initialOpen={ false }>
					<SelectCustomViewsControl
						{ ...{
							customViews,
							setSupportsNumberPerRow,
							setSupportsNumberPerRowInitialOpen,
							setSupportsCustomAnchorID,
							...props,
						} }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const { getEntityRecords } = select( 'core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const { taxonomies } = ownProps;
		let allTaxonomyTerms = false;
		const query = { per_page: -1 };

		if ( taxonomies ) {
			allTaxonomyTerms = map( taxonomies, ( taxonomy ) => {
				return {
					name: taxonomy.name,
					slug: taxonomy.slug,
					data: getEntityRecords( 'taxonomy', taxonomy.slug, query ),
					resolving: hasFinishedResolution(
						'core',
						'getEntityRecords',
						[ 'taxonomy', taxonomy.slug, query ]
					),
				};
			} );
		}

		return {
			allTaxonomyTerms,
		};
	} )
)( Inspector );
