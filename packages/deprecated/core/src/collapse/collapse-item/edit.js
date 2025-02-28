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
import { useSelect } from '@wordpress/data';

function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		id,
		headerText,
		showOpen,
		isAccordion,
		parentClientId,
		anchorName,
		hasSubtitle,
		subtitle
	} = attributes;

	const { parentClientIds, parentAttributes } = useSelect( ( select ) => {
		return {
			parentClientIds:
				select( 'core/block-editor' ).getBlockParents( clientId ),
			parentAttributes: select( 'core/block-editor' ).getBlockAttributes(
				select( 'core/block-editor' )
					.getBlockParents( clientId )
					.slice( -1 )[ 0 ]
			),
		};
	}, [] );

	const TEMPLATE = [ [ 'core/paragraph' ] ];

	useEffect( () => {
		setAttributes( { id: `${ clientId }` } );
	}, [ clientId ] );

	useEffect( () => {
		setAttributes( {
			parentClientId: `${ parentClientIds.slice( -1 )[ 0 ] }`,
		} );
	}, [ parentClientIds ] );

	useEffect( () => {
		if ( ! parentAttributes ) return;

		setAttributes( {
			heading: parentAttributes?.heading,
			structuredData: parentAttributes?.structuredData,
		} );
	}, [ parentAttributes ] );

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
				anchorName={ anchorName }
				setAnchorName={ ( value ) =>
					setAttributes( { anchorName: value } )
				}
				hasSubtitle={ hasSubtitle }
				setHasSubtitle={ ( value ) =>
					setAttributes( { hasSubtitle: value } )
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
				accordionId={ parentClientId }
				hasSubtitle={ hasSubtitle }
				subtitle={ subtitle }
				setSubtitle={ ( value ) =>
					setAttributes( { subtitle: value } )
				}
			>
				<InnerBlocks templateLock={ false } template={ TEMPLATE } />
			</CollapseItem>
		</>
	);
}

export default Edit;
