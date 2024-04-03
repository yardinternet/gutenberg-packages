/**
 * WordPress dependencies
 */
import {
	store as blockEditorStore,
	useBlockEditContext,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

export const useParentBlock = () => {
	const { clientId } = useBlockEditContext();

	/**
	 * Returns the list of blocks of all its parents from top to bottom
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblockparents
	 */
	const parentBlocks = useSelect( ( select ) =>
		select( blockEditorStore ).getBlockParents( clientId )
	);
	const parentBlockClientId = parentBlocks.at( -1 );

	/**
	 * Returns the parent block
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblock
	 */
	const parentBlock = useSelect( ( select ) =>
		select( blockEditorStore ).getBlock( parentBlockClientId )
	);

	/**
	 * Returns the parent block attributes
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblockattributes
	 */
	const parentAttributes = useSelect( ( select ) =>
		select( blockEditorStore ).getBlockAttributes( parentBlockClientId )
	);

	const { updateBlockAttributes, selectBlock } =
		useDispatch( blockEditorStore );

	/**
	 * Action to update parent block attributes
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#updateblockattributes
	 *
	 * @param {Object} attributes - the attributes to update
	 */
	const setParentAttributes = useCallback(
		( attributes ) => {
			updateBlockAttributes( parentBlockClientId, attributes );
		},
		[ updateBlockAttributes, parentBlockClientId ]
	);

	/**
	 * Action to select the parent block
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#selectblock
	 */
	const selectParentBlock = useCallback( () => {
		selectBlock( parentBlockClientId );
	}, [ selectBlock, parentBlockClientId ] );

	return {
		parentBlock,
		parentAttributes,
		setParentAttributes,
		selectParentBlock,
	};
};
