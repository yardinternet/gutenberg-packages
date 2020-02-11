/**
 * External dependencies
 */
import { Global } from '@emotion/core';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, subscribe, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Cards from './components/cards';
import BasicBlockAppender from './components/block-appender';
import cardMetaData from './card/block.json';
import editorStyles from './editor-styles';

function Edit( props ) {
	const { clientId, attributes } = props;
	const { getBlockCount, getBlock } = select( 'core/block-editor' );
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );
	const { cardsPerRow } = attributes;

	let blockCount = getBlockCount( clientId );

	subscribe( () => {
		const newBlockCount = getBlockCount( clientId );
		const blockCountChanged = blockCount !== newBlockCount;

		blockCount = newBlockCount;

		if ( blockCountChanged ) {
			const currentBlock = getBlock( clientId );

			if ( currentBlock && !! currentBlock.innerBlocks ) {
				currentBlock.innerBlocks.map( ( innerBlock ) => {
					return updateBlockAttributes( innerBlock.clientId, {
						...innerBlock.attributes,
						...{
							parentCardCount:
								cardsPerRow > 0 ? cardsPerRow : newBlockCount,
						},
					} );
				} );
			}

			updateBlockAttributes( clientId, {
				...attributes,
				...{ cardCount: newBlockCount },
			} );
		}
	} );

	return (
		<>
			<Global styles={ editorStyles } />
			<Inspector { ...{ blockCount, clientId, ...props } } />
			<Cards { ...props }>
				<InnerBlocks
					allowedBlocks={ [ cardMetaData.name ] }
					template={ [ [ cardMetaData.name ] ] }
					renderAppender={ () => (
						<BasicBlockAppender
							clientId={ clientId }
							blockName={ cardMetaData.name }
						/>
					) }
				/>
			</Cards>
		</>
	);
}

export default Edit;
