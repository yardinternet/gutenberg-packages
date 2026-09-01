/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import { CollapseProvider } from './context';

function Edit( { clientId, attributes, setAttributes } ) {
	const { accordionId, heading, structuredData } = attributes;

	const TEMPLATE = [ [ 'yard-blocks/collapse-item' ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/collapse-item' ];

	const blockProps = useBlockProps( {
		className: 'yard-blocks-collapse',
	} );

	useEffect( () => {
		setAttributes( { accordionId: `${ clientId }` } );
	}, [ clientId ] );

	return (
		<>
			<Inspector
				heading={ heading }
				structuredData={ structuredData }
				setAttributes={ setAttributes }
				clientId={ clientId }
			/>
			<CollapseProvider>
				<div { ...blockProps } id={ `accordion-${ accordionId }` }>
					<InnerBlocks
						renderAppender={ () => (
							<InnerBlocks.ButtonBlockAppender />
						) }
						allowedBlocks={ ALLOWED_BLOCKS }
						defaultBlock={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</CollapseProvider>
		</>
	);
}

export default Edit;
