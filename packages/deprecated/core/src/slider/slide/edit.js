/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

const Edit = ( props ) => {
	const { clientId, context } = props;

	const blockProps = useBlockProps( {
		className: 'yard-blocks-slide',
	} );

	const TEMPLATE = applyFilters( 'yard-blocks.slideTemplate', [
		[ 'core/paragraph' ],
	] );

	return (
		<div { ...blockProps }>
			<div
				style={ {
					display:
						clientId ===
						context[ 'yard-blocks/slider-active-slide' ]
							? 'block'
							: 'none',
					padding: '1rem',
					border: '1px solid #ccc',
					marginTop: '1rem',
					marginBottom: '1rem',
				} }
			>
				<InnerBlocks templateLock={ false } template={ TEMPLATE } />
			</div>
		</div>
	);
};

export default Edit;
