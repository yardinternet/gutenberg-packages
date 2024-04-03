/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import {
	store as blockEditorStore,
	useBlockEditContext,
} from '@wordpress/block-editor';
import { useCallback, useMemo } from '@wordpress/element';

export const useCurrentBlock = () => {
	const { clientId } = useBlockEditContext();

	/**
	 * Returns the current block
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblock
	 */
	const currentBlock = useSelect( ( select ) =>
		select( blockEditorStore ).getBlock( clientId )
	);

	const currentBlockInnerBlocks = useMemo(
		() => currentBlock.innerBlocks ?? [],
		[ currentBlock.innerBlocks ]
	);

	/**
	 * Returns the current block attributes
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#getblockattributes
	 */
	const currentBlockAttributes = useSelect( ( select ) =>
		select( blockEditorStore ).getBlockAttributes( currentBlock.clientId )
	);

	/**
	 * Returns true if one of the current block inner blocks is selected
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#hasselectedinnerblock
	 */
	const currentBlockHasSelectedInnerBlock = useSelect( ( select ) =>
		select( blockEditorStore ).hasSelectedInnerBlock(
			currentBlock.clientId,
			true
		)
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	/**
	 * Action to update all inner blocks attributes of the current block
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/#updateblockattributes
	 *
	 * @param {Object} attributes - the attributes to update
	 */
	const setAllCurrentBlockInnerBlocksAttributes = useCallback(
		( attributes ) => {
			currentBlockInnerBlocks.forEach( ( child ) =>
				updateBlockAttributes( child.clientId, attributes )
			);
		},
		[ currentBlockInnerBlocks, updateBlockAttributes ]
	);

	return {
		currentBlock,
		currentBlockAttributes,
		currentBlockInnerBlocks,
		currentBlockHasSelectedInnerBlock,
		setAllCurrentBlockInnerBlocksAttributes,
	};
};
