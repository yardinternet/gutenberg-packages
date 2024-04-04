/**
 * External dependencies
 */
import { Global } from '@emotion/react';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

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

	useEffect( () => {
		updateAttributes();
	}, [ getBlockCount( clientId ) ] );

	const updateAttributes = () => {
		const newBlockCount = getBlockCount( clientId );
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
	};

	return (
		<>
			<Global styles={ editorStyles } />
			<Inspector { ...{ clientId, ...props } } />
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
