/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { createTaxObject, buildTaxParamsQueryString } from '../utils';

export const fetchListPosts = ( slug, baseSlug = 'wp/v2/' ) => {
	return apiFetch( { path: `${ baseSlug }${ slug }?per_page=100` } );
};

export const searchListPosts = ({
	baseUrl,
	baseSlug = 'wp/v2/search/',
	subtype = 'any',
	search
}) => {
	const options = baseUrl
		? {
				url: `${ baseUrl }/${ baseSlug }?subtype=${ subtype }&search=${ search }`,
		  }
		: {
				path: `${ baseSlug }?subtype=${ subtype }&search=${ search }`,
		  };

	return apiFetch(options);
};

export function fetchCustomViews() {
	return apiFetch( {
		path: 'yard/blocks/v1/yard-blocks/list-posts/custom-views',
	} );
}

export function fetchTaxonomies() {
	return apiFetch( { path: 'wp/v2/taxonomies' } );
}

/**
 * Fetch external taxonomies including terms.
 * Result is used for creating the filter panel in the inspector, used for filtering.
 *
 * @return {Array} externalTaxObjects
 */
export async function fetchExternalTaxonomies() {
	const configTaxonomies = applyFilters(
		'yard-blocks.listPostsExternalTaxonomies',
		false
	);

	if ( ! configTaxonomies ) {
		return [];
	}

	const externalTaxObjects = [];

	for ( const [ taxonomySource, taxonomy ] of Object.entries(
		configTaxonomies
	) ) {
		// Taxonomy is an indexed array therefore this for loop is required.
		for ( let iteration = 0; iteration < taxonomy.length; iteration++ ) {
			const taxObject = await createTaxObject(
				taxonomySource,
				taxonomy,
				iteration
			);

			externalTaxObjects.push( taxObject );
		}
	}

	return externalTaxObjects;
}

/**
 * @param {Array} urlObjects
 * @return {Object} - { errors: [], posts: [] }
 */
export async function fetchSources( urlObjects = [], taxonomyTerms = [] ) {
	const extraParams = applyFilters(
		'yard-blocks.listPostsFetchSourcesParams',
		{
			limit: 100,
		}
	);

	const remoteSourcesKeys = applyFilters(
		'yard-blocks.listPostsRemoteSourcesKeys',
		[]
	);

	const urlParams = new URLSearchParams( extraParams ).toString();
	const errors = [];

	const promises = await Promise.all(
		urlObjects.map( async ( urlObject ) => {
			const taxParams = buildTaxParamsQueryString(
				urlObject,
				taxonomyTerms
			);
			let url = `${ urlObject.url }?${ urlParams }`;

			// Add taxParams to url when not empty.
			if ( !! taxParams.length ) {
				url += '&' + taxParams;
			}

			try {
				const response = await fetch( url );
				const json = await response.json();
				let filterJSON = [];

				// Validate if the posts are in a nested object.
				remoteSourcesKeys.forEach( ( key ) => {
					if ( json[ key ] ) filterJSON = json[ key ];
				} );

				const mapData = filterJSON.length > 0 ? filterJSON : json;

				if ( ! Array.isArray( mapData ) ) {
					return false;
				}

				// Add select options.
				return mapData.map( ( item ) => {
					return {
						...item,
						...{
							_yb_list_posts_option: JSON.stringify(
								applyFilters(
									'yard-blocks.listPostsRemoteSourcesMapping',
									{
										siteTitle: urlObject.title,
										postId: item.id,
										title:
											item.title instanceof Object
												? item.title.rendered ?? ''
												: item.title ?? '',
										url: urlObject.url,
										baseUrl: urlObject.baseUrl,
										slug: urlObject.slug,
									},
									item,
									urlObject
								)
							),
						},
					};
				} );
			} catch ( error ) {
				errors.push( { url: urlObject.url, title: urlObject.title } );
				// eslint-disable-next-line
				console.log(
					error,
					`site ${ urlObject.url } could not be fetched`
				);
			}
		} )
	);

	return {
		errors,
		// Remove falsy values
		posts: promises.filter( ( item ) => item ),
	};
}
