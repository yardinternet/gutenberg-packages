/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function Edit( props ) {
	const TEMPLATE = [ [ 'yard-blocks/iconlist-item', { props } ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/iconlist-item' ];

	const blockProps = useBlockProps( { className: 'yard-blocks-iconlist' } );

	return (
		<ul { ...blockProps }>
			<InnerBlocks
				renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				allowedBlocks={ ALLOWED_BLOCKS }
				defaultBlock={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</ul>
	);
}

export default Edit;
