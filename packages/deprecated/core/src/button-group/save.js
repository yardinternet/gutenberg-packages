/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ButtonGroup from './components/button-group';

function save( { className, attributes } ) {
	const { btnWidth, btnAlignment } = attributes;

	return (
		<ButtonGroup
			btnAlignment={ btnAlignment }
			btnWidth={ btnWidth }
			className={ className }
		>
			<InnerBlocks.Content />
		</ButtonGroup>
	);
}

export default save;
