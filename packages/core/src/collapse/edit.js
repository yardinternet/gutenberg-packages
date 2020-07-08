/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

function Edit() {
	const TEMPLATE = [ [ 'yard-blocks/collapse-item' ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/collapse-item' ];

	return (
		<div className={ `yard-blocks-collapse` } id="accordion">
			<InnerBlocks
				renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				allowedBlocks={ ALLOWED_BLOCKS }
				defaultBlock={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}

export default Edit;
