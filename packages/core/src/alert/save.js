/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import Alert from './components/alert';

function save( props ) {
	return (
		<Alert { ...props }>
			<InnerBlocks.Content />
		</Alert>
	);
}

export default save;
