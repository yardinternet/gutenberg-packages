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

	const urlParams = new URLSearchParams( extraParams ).toString();
	const errors = [];

	const promises = await Promise.all(
		urlObjects.map( async ( obj ) => {
			try {
				const response = await fetch( `${ obj.url }?${ urlParams }` );
				const json = await response.json();

				if ( ! Array.isArray( json ) ) {
					return false;
				}

				// Add select option
				return json.map( ( item ) => {
					return {
						...item,
						...{
							_yb_list_posts_option: JSON.stringify( {
								siteTitle: obj.title,
								postId: item.id,
								title: item.title.rendered,
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
