import React from 'react'; // eslint-disable-line

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Higher order component for doing innerBlock operations like remove, duplicate and move
 *
 * @return { Function } - Higher order component
 */
const withInnerBlocks = () =>
	createHigherOrderComponent(
		compose( [
			withSelect( ( select, props ) => {
				const {
					getBlocksByClientId,
					getBlockRootClientId,
					getBlocks,
					getBlockIndex,
				} = select( 'core/block-editor' );

				const { clientId } = props;

				const blocks = getBlocksByClientId( clientId );
				const rootClientId = getBlockRootClientId( clientId );
				const currentBlockIndex = getBlockIndex(
					clientId,
					rootClientId
				);

				return {
					getBlocks,
					blocks,
					rootClientId,
					currentBlockIndex,
					hasNext:
						currentBlockIndex + 1 !==
						getBlocks( rootClientId ).length,
					hasPrev: currentBlockIndex !== 0,
				};
			} ),
			withDispatch( ( dispatch, props, registry ) => {
				const { getBlocks } = props;

				const { replaceInnerBlocks, clearSelectedBlock } =
					dispatch( 'core/block-editor' );

				const { getBlockRootClientId } =
					registry.select( 'core/block-editor' );

				return {
					/**
					 * Removes the InnerBlock
					 *
					 * @param {string} clientId
					 */
					onInnerBlocksRemove( clientId ) {
						const rootClientId = getBlockRootClientId( clientId );
						const innerBlocks = getBlocks( rootClientId );
						const filterBlocks = innerBlocks.filter(
							( block ) => block.clientId !== clientId
						);

						if ( filterBlocks ) {
							replaceInnerBlocks( rootClientId, filterBlocks );
							clearSelectedBlock( clientId );
						}
					},
				};
			} ),
		] ),
		'withInnerBlocks'
	);
export default withInnerBlocks;
