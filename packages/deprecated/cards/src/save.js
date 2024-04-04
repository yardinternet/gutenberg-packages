/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Cards from './components/cards';

function save( props ) {
	return (
		<Cards { ...props }>
			<InnerBlocks.Content />
		</Cards>
	);
}

export default save;
