/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function BasicBlockAppender( { clientId, blockName } ) {
	const insertBlock = () => {
		const { getBlockOrder } = select( 'core/block-editor' );

		const { insertBlocks } = dispatch( 'core/block-editor' );

		const block = createBlock( blockName );

		insertBlocks( block, getBlockOrder( clientId ).length, clientId );
	};

	return (
		<button
			className="yard-block-inserter components-button block-editor-button-block-appender"
			onClick={ insertBlock }
			type="button"
		>
			<span className="screen-reader-text">
				{ __( 'Blok toevoegen' ) }
			</span>
			<Icon icon="insert" />
		</button>
	);
}

export default BasicBlockAppender;
