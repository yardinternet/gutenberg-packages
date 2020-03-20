/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

export const fetchSupportingPosts = ( slug, baseSlug = 'wp/v2/' ) => {
	return apiFetch( { path: `${ baseSlug }${ slug }?per_page=100` } );
};
