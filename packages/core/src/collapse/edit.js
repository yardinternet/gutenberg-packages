/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

function Edit( { clientId, attributes, setAttributes } ) {
	const { accordionId } = attributes;

	const TEMPLATE = [ [ 'yard-blocks/collapse-item' ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/collapse-item' ];

	useEffect( () => {
		setAttributes( { accordionId: `${ clientId }` } );
	}, [ clientId ] );

	return (
		<div
			className={ `yard-blocks-collapse` }
			id={ `accordion-${ accordionId }` }
		>
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
