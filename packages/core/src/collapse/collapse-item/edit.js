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
	const { attributes, setAttributes } = props;
	const { id, headerText, showOpen, isAccordion } = attributes;

	const TEMPLATE = [ [ 'core/paragraph' ] ];

	useEffect( () => {
		if ( id === 0 ) {
			setAttributes( { id: getRandomInt( 1, 100000 ) } );
		}
	}, [] );

	function getRandomInt( min, max ) {
		min = Math.ceil( min );
		max = Math.floor( max );
		return Math.floor( Math.random() * ( max - min ) ) + min;
	}

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
