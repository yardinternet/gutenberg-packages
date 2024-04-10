/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useCallback } from '@wordpress/element';

export const useCurrentPostMeta = ( metaKey ) => {
	/**
	 * Returns the current post meta
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#geteditedpostattribute
	 */
	const meta = useSelect( ( select ) =>
		select( editorStore ).getEditedPostAttribute( 'meta' )
	);

	const { editPost } = useDispatch( editorStore );

	/**
	 * Action to update the current post meta
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#editpost
	 */
	const setMeta = useCallback(
		( value ) => editPost( { meta: { [ metaKey ]: value } } ),
		[ editPost, metaKey ]
	);

	return [ meta?.[ metaKey ], setMeta ];
};
