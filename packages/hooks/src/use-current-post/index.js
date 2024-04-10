/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

export const useCurrentPost = () => {
	/**
	 * Returns the current post type
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/#getcurrentposttype
	 */
	const currentPostType = useSelect( ( select ) =>
		select( editorStore ).getCurrentPostType()
	);

	return {
		currentPostType,
	};
};
