/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useCallback } from '@wordpress/element';

export const useCurrentPost = () => {
	/**
	 * Returns the current post type
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#getcurrentposttype
	 */
	const currentPostType = useSelect( ( select ) =>
		select( editorStore ).getCurrentPostType()
	);

	/**
	 * Returns the current post meta
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#geteditedpostattribute
	 */
	const currentPostMeta = useSelect( ( select ) =>
		select( editorStore ).getEditedPostAttribute( 'meta' )
	);

	const { editPost } = useDispatch( editorStore );

	/**
	 * Action to update the current post meta
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#editpost
	 *
	 * @param {Object} updatedMeta - the meta to update
	 */
	const editPostMeta = useCallback(
		( updatedMeta ) => {
			editPost( { meta: updatedMeta } );
		},
		[ editPost ]
	);

	return {
		currentPostType,
		currentPostMeta,
		editPostMeta,
	};
};
