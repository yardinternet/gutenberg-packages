/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import CollapseItem from './components/collapse-item';
/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { id, headerText, showOpen, isAccordion } = attributes;

	const TEMPLATE = [ [ 'core/paragraph' ] ];

	useEffect( () => {
		setAttributes( { id: `${ clientId }` } );
	}, [ clientId ] );

	return (
		<>
			<Inspector
				showOpen={ showOpen }
				setShowOpen={ ( value ) =>
					setAttributes( { showOpen: value } )
				}
				isAccordion={ isAccordion }
				setIsAccordion={ ( value ) =>
					setAttributes( { isAccordion: value } )
				}
			/>

			<CollapseItem
				headerText={ headerText }
				setHeaderText={ ( value ) =>
					setAttributes( { headerText: value } )
				}
				showOpen={ showOpen }
				id={ id }
				isAccordion={ isAccordion }
			>
				<InnerBlocks
					allowedBlocks={ true }
					templateLock={ false }
					template={ TEMPLATE }
				/>
			</CollapseItem>
		</>
	);
}

export default Edit;
