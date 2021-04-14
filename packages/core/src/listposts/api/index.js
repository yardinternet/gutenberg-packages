/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

export const fetchListPosts = ( slug, baseSlug = 'wp/v2/' ) => {
	return apiFetch( { path: `${ baseSlug }${ slug }?per_page=100` } );
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
 * @param {Array} urlObjects
 * @return {Object} - { errors: [], posts: [] }
 */
export async function fetchSources( urlObjects = [] ) {
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
		urlObjects.map( async ( obj ) => {
			try {
				const response = await fetch( `${ obj.url }?${ urlParams }` );
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

				// Add select option
				return mapData.map( ( item ) => {
					return {
						...item,
						...{
							_yb_list_posts_option: JSON.stringify( {
								siteTitle: obj.title,
								postId: item.id,
								title: item.title.rendered ?? item.title,
								url: obj.url,
								baseUrl: obj.baseUrl,
								slug: obj.slug,
							} ),
						},
					};
				} );
			} catch ( error ) {
				errors.push( { url: obj.url, title: obj.title } );
				// eslint-disable-next-line
				console.log( error, `site ${ obj.url } could not be fetched` );
			}
		} )
	);

	return {
		errors,
		// Remove falsy values
		posts: promises.filter( ( item ) => item ),
	};
}
