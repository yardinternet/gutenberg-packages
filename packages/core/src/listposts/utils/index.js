/**
 * External dependencies
 */
import { startCase, sortBy, find, map, filter } from 'lodash';
/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

export const excludePostTypes = [
	'attachment',
	'post',
	'wp_block',
	'yard-presets',
	'wp_template',
	'wp_template_part',
	'wp_navigation',
	'nav_menu_item',
];

export const excludeTaxonomies = [
	'category',
	'tribe_events_cat',
	'post_tag',
	'yard-presets-taxonomy',
];

/**
 * Filter postTypes
 *
 * @param {Object} postTypes - fetched from wp rest api
 * @return {Array} - []
 */
export function filterPostTypes( postTypes = {} ) {
	const excluded = applyFilters(
		'yard-blocks.listPostsExcludePostTypes',
		excludePostTypes
	);

	return Object.keys( postTypes )
		.filter( ( item ) => excluded.indexOf( item ) === -1 )
		.map( ( item ) => postTypes[ item ] );
}

/**
 * Filter taxonomies
 *
 * @param {Object} taxonomies - fetched from wp rest api
 * @return {Array} - []
 */
export function filterTaxonomies( taxonomies = {} ) {
	const excluded = applyFilters(
		'yard-blocks.listPostsExcludeTaxonomies',
		excludeTaxonomies
	);

	return Object.keys( taxonomies )
		.filter( ( item ) => excluded.indexOf( item ) === -1 )
		.map( ( item ) => taxonomies[ item ] );
}

/**
 * Map posttype to key/value used in select control
 *
 * @param {Object} postTypes - fetched from wp rest api
 * @return {Array} - []
 */
export function mapPostTypes( postTypes = [] ) {
	return sortBy(
		postTypes.map( ( postType ) => ( {
			label: postType.name.replace( '&#39;', "'" ),
			value: postType.slug,
		} ) ),
		'label'
	);
}

/**
 *  Map posts to key/value array used in select control
 *
 * @param {Array} posts wp posts
 * @return {Array} posts
 */
export function mapPosts( posts = [] ) {
	return posts.map( ( post ) => ( {
		value: post.id,
		label:
			post.title.rendered !== ''
				? post.title.rendered
				: __( 'Geen titel' ),
	} ) );
}

/**
 * Map any posts to key/value array used in select control
 *
 * @param {Array} posts { id, title, posttype }
 * @return {Array} posts
 */
export function mapAnyPosts( posts = [] ) {
	return posts.map( ( post ) => ( {
		value: post.id,
		label: post.title !== '' ? post.title : __( 'Geen titel' ),
	} ) );
}

/**
 *	Map events to key/value array
 *
 * @param {Object} eventObj - events from events calendar
 * @return {Array} []
 */
export function mapEvents( eventObj = {} ) {
	return eventObj.events
		? eventObj.events.map( ( event ) => ( {
				label: event.title,
				value: event.id,
		  } ) )
		: [];
}

/**
 * Returns an array with key pair values which is used by the custom-views-control
 *
 * @param {Array} customViews - received from the rest api endpoint i.e. [ 'example', 'news' ]
 * @return {Array} - [{ label: 'Example', value: 'example }]
 */
export function mapCustomViewsToKeyPair( customViews = {} ) {
	return Object.keys( customViews ).map( ( key ) => ( {
		label: startCase( key ),
		value: key,
	} ) );
}

/**
 * 	Validation if the template supports given yard-props
 *
 * @param {Array}  customViews - received from the rest api endpoint i.e. [ 'example', 'news' ]
 * @param {string} customView
 * @param {string} propName
 *  @return {boolean|Array} boolean|array
 */
export function templateValidateYardPropsSupport(
	customViews = {},
	customView = '',
	propName = ''
) {
	if (
		! customViews ||
		! customViews[ customView ] ||
		! customViews[ customView ].hasOwnProperty( 'props' )
	) {
		return false;
	}

	return customViews[ customView ].props.filter(
		( prop ) => prop.name === propName && prop.value
	);
}

export function populateExternalTaxonomyValues(
	taxonomies = [],
	selectedTerms = []
) {
	const values = [];
	selectedTerms.map( ( term ) => {
		const taxonomy = find( taxonomies, [ 'slug', term ] );

		if ( taxonomy ) {
			values.push( {
				label: taxonomy.name,
				value: taxonomy.slug,
			} );
		}

		return false;
	} );

	return values;
}

/**
 *	Returns array with selected options for each taxonomy
 *
 * @param {Array} taxonomies         - all taxonomies
 * @param {Array} [selectedTerms=[]] - selected taxonomy terms
 * @return {Array} [ { label: 'Pages', value: 'pages' } ]
 */
export function populateTaxonomyValues( taxonomies = [], selectedTerms = [] ) {
	const values = [];

	selectedTerms.map( ( term ) => {
		const taxonomy = find( taxonomies, [ 'slug', term ] );

		if ( taxonomy ) {
			values.push( {
				label: taxonomy.name,
				value: taxonomy.slug,
			} );
		}

		return false;
	} );

	return values;
}

/**
 *	Filters out terms that are selected but doesn't exist anymore
 *	These terms can be deleted by the user but still present as attribute
 * 	This influences the query params with deleted terms, which can result in unexpected behaviour
 *
 * @param {Array}  allTerms      All terms/taxos found by WP
 * @param {Object} selectedTerms All terms/taxos selected
 * @return {Object} filteredTerms
 */
export function filterRemovedTerms( allTerms = [], selectedTerms = {} ) {
	const filteredTerms = {};

	map( allTerms, ( taxonomy ) => {
		if ( ! taxonomy.data ) return;
		if ( !! taxonomy.data.length ) {
			const filtered = filter(
				selectedTerms[ taxonomy.slug ],
				( selectedTaxonomy ) =>
					find( taxonomy.data, [ 'slug', selectedTaxonomy ] )
			);

			return !! filtered.length
				? ( filteredTerms[ taxonomy.slug ] = filtered )
				: [];
		}
	} );

	return filteredTerms;
}

/**
 * Find chosen stickypost in posts array and return it as value for the select.
 *
 * @param {Array}  posts
 * @param {number} value
 *
 * @return {Object} post
 */
export function getValueLabelObjectByValue( posts = [], value = 0 ) {
	return posts.find( function ( post ) {
		if ( post.value === value ) {
			return post.value;
		}

		return false;
	}, value );
}

/**
 *
 * @param {Object} numberPerRow
 * @return {boolean} true|false
 */
export function hasSupportsNumberPerRow( {
	numberPerRow = 0,
	numberPerRowLg = 0,
	numberPerRowSm = 0,
	numberPerRowXs = 0,
} ) {
	return !! [
		numberPerRow,
		numberPerRowLg,
		numberPerRowSm,
		numberPerRowXs,
	].filter( ( item ) => !! item ).length;
}

/**
 * Validate if the taxonomy is present in the selected external source.
 *
 * @param {Array}  selectedSources
 * @param {Object} taxonomy
 *
 * @return {boolean} true|false
 */
export function taxInSelectedSource( selectedSources = [], taxonomy = {} ) {
	const filteredSelectedSource = selectedSources.filter( ( source ) => {
		if (
			! source.hasOwnProperty( 'taxonomies' ) ||
			source.taxonomies === undefined
		) {
			return false;
		}

		const filtered = source.taxonomies.filter( ( item ) => {
			if (
				! item.hasOwnProperty( 'taxonomies' ) ||
				item.taxonomies === undefined
			) {
				return false;
			}

			return item.taxonomies.includes( taxonomy.slug );
		} );

		return !! filtered.length;
	} );

	return !! filteredSelectedSource.length;
}

/**
 * Check if taxonomy is associated with the given postType
 * Only render taxonomy select control when the taxonomy contains the postType
 *
 * @param {Array}  taxonomies
 * @param {Object} taxonomy
 * @param {string} postType
 * @return {boolean} true|false
 */
export function hasPostypeTaxonomy(
	taxonomies = [],
	taxonomy = {},
	postType = ''
) {
	if ( postType === 'any' ) {
		return true;
	}

	return !! taxonomies
		.filter( ( taxo ) => taxo.slug === taxonomy.slug )
		.filter( ( item ) => item.types.includes( postType ) ).length;
}

/**
 * @param {Array} options
 * @return {Array} array with urls and slugs
 */
export function parseToAttributes( options = [] ) {
	if ( options === null ) return [];

	const parseOptions = options.map( ( item ) => JSON.parse( item.value ) );
	const mergeObj = {};

	// Merge items with the same baseUrl
	parseOptions.map( ( item ) => {
		const taxObject = { source: item.slug, taxonomies: item.taxonomies };

		if ( ! mergeObj[ item.baseUrl ] ) {
			return ( mergeObj[ item.baseUrl ] = {
				baseUrl: item.baseUrl,
				slugs: [ item.slug ],
				taxonomies: [ taxObject ],
			} );
		}

		mergeObj[ item.baseUrl ].taxonomies = mergeObj[
			item.baseUrl
		].taxonomies.concat( [ taxObject ] );

		return ( mergeObj[ item.baseUrl ].slugs = mergeObj[
			item.baseUrl
		].slugs.concat( [ item.slug ] ) );
	} );

	// Return merged objects
	return Object.keys( mergeObj ).map( ( obj ) => mergeObj[ obj ] );
}

/**
 *
 * @param {Array}  sources
 * @param {string} value
 */
export const findSourceByBaseUrl = ( sources = [], value = '' ) => {
	return sources.filter( ( source ) => value === source.baseUrl ).pop();
};

/**
 *
 * @param {Array}  types
 * @param {string} value
 */
export const findTypeBySlug = ( types = [], value = '' ) => {
	return types.filter( ( type ) => type.slug === value ).pop();
};

/**
 * Filter the stickypost select so it does not includes excluded posts
 *
 * @param {Array} excludedPosts
 * @param {Array} posts
 *
 * @return {Array} posts
 */
export const filterStickyPostSelectOptions = ( excludedPosts, posts ) => {
	if ( ! excludedPosts || ! excludedPosts.length ) {
		return posts;
	}

	return posts.filter( ( post ) => {
		const result = excludedPosts.find( function ( excludedPost ) {
			if ( excludedPost.value === post.value ) {
				return post.value;
			}

			return false;
		}, post.value );

		return !! result ? false : true;
	} );
};

/**
 * Filter the excluded posts select so it does not include sticky post
 *
 * @param {boolean} stickyPostSelection
 * @param {number}  selectedStickyPostID
 * @param {Array}   posts
 *
 * @return {Array} posts
 */
export const filterExcludedPostsSelectOptions = (
	stickyPostSelection,
	selectedStickyPostID,
	posts
) => {
	if (
		! stickyPostSelection ||
		! Number.isInteger( selectedStickyPostID || ! selectedStickyPostID > 0 )
	) {
		return posts;
	}

	return posts.filter( ( post ) => {
		return post.value !== selectedStickyPostID;
	} );
};

/**
 *
 * @param {string} taxonomySource
 * @param {Array}  taxonomy
 * @param {number} iteration
 *
 * @return {Object} taxObject
 */
export async function createTaxObject( taxonomySource, taxonomy, iteration ) {
	const terms = [];
	const response = await fetch(
		`${ taxonomy[ iteration ].url }?per_page=100`
	);
	const json = await response.json();
	const taxObject = {
		source: taxonomySource,
		name: taxonomy[ iteration ].taxonomy,
		panelName: taxonomy[ iteration ].panelName,
	};

	Object.values( json ).map( ( taxonomyTerm ) => {
		if ( taxonomyTerm.taxonomy === taxonomy[ iteration ].taxonomy ) {
			taxonomyTerm.source = taxonomySource;
			terms.push( taxonomyTerm );
		}

		return taxonomyTerm;
	} );

	taxObject.terms = terms;

	return taxObject;
}

/**
 *
 * @param {Object} obj
 * @param {Array}  taxonomyTerms
 *
 * @return {string} taxQueryString
 */
export function buildTaxParamsQueryString( obj, taxonomyTerms ) {
	if (
		! obj.hasOwnProperty( 'taxonomies' ) ||
		! obj.taxonomies.hasOwnProperty( 'taxonomies' ) ||
		obj.taxonomies.taxonomies === undefined
	) {
		return '';
	}

	if ( ! obj.taxonomies.taxonomies.length ) {
		return '';
	}

	let taxQueryString = '';

	obj.taxonomies.taxonomies.forEach( ( tax ) => {
		if ( taxonomyTerms[ tax ] !== undefined ) {
			// taxQueryString contains one or more query strings, append '&' for seperating query string per taxonomy.
			if ( !! taxQueryString.length ) {
				taxQueryString += '&';
			}

			taxQueryString += tax + '=' + taxonomyTerms[ tax ].toString();
		}
	} );

	return taxQueryString;
}
