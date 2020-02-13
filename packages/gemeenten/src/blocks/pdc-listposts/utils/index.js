/**
 * Find chosen stickypost in posts array and return it as value for the select.
 *
 * @param {Array} posts
 * @param {number} value
 * @return {Object} post
 */
export function getSelectedPost( posts = [], value = 0 ) {
	return posts.find( function( post ) {
		if ( post.value === value ) {
			return post.value;
		}

		return false;
	}, value );
}

/**
 * Create Select options from posts
 *
 * @param {Array} posts
 * @return {Array} [{ value: 'postID, label: 'postTitle }]
 */
export function postOptions( posts ) {
	return posts.map( function( post ) {
		return { value: post.id, label: post.title };
	} );
}
