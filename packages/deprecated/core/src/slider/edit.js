/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Track from './track';
import Inspector from './components/inspector';

const Edit = ( props ) => {
	const [ currentSlide, setCurrentSlide ] = useState( null );
	const { attributes, setAttributes } = props;
	const { insertBlock, selectBlock } = useDispatch( 'core/block-editor' );

	const { getBlockOrder, currentSelectedBlock } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( 'core/block-editor' );
		return {
			getBlockOrder: select( 'core/block-editor' ).getBlockOrder,
			currentSelectedBlock: getSelectedBlockClientId(),
		};
	}, [] );

	const innerBlocks = useSelect( ( select ) => {
		const { getBlocks } = select( 'core/block-editor' );
		const { clientId } = props;
		const blocks = getBlocks( clientId );
		return blocks;
	}, [] );

	const TEMPLATE = [ [ 'yard-blocks/slide' ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/slide' ];
	const blockProps = useBlockProps( {
		className: 'yard-blocks-slider',
		'data-slides-per-page-desktop': attributes.slidesPerPageDesktop,
		'data-slides-per-page-laptop': attributes.slidesPerPageLaptop,
		'data-slides-per-page-tablet': attributes.slidesPerPageTablet,
		'data-slides-per-page-mobile': attributes.slidesPerPageMobile,
		'data-show-pagination': attributes.showPagination,
		style: {
			padding: '1rem',
		},
	} );

	/**
	 * When placing the block for the first time in the content, set the first slide as active slide.
	 */
	useEffect( () => {
		if ( innerBlocks.length > 0 && ! currentSlide ) {
			setCurrentSlide( innerBlocks[ 0 ].clientId );
		}
	}, [ innerBlocks ] );

	/**
	 * Insert slide (at the end of the slider)
	 */
	const insertSlide = () => {
		const slide = createBlock( 'yard-blocks/slide' );

		insertBlock(
			slide,
			getBlockOrder( props.clientId ).length,
			props.clientId
		);

		setCurrentSlide( slide.clientId );
	};

	/**
	 * Set and select an active slide.
	 *
	 * @param {number} clientId
	 */
	const selectSlide = ( clientId ) => {
		setCurrentSlide( clientId );
		selectBlock( clientId );
	};

	/**
	 * Set attribute to use "providesContext" in child slide blocks
	 */
	useEffect( () => {
		setAttributes( { activeSlide: currentSlide } );
	}, [ currentSlide ] );

	/**
	 * Edge case: sometimes the currentSlide is null, showing an empty slider (for example when you delete a slide).
	 * In that case, we need to set the currentSlide to the selectedBlock from the core/block-editor store.
	 */
	useEffect( () => {
		if (
			innerBlocks.some(
				( block ) => block.clientId === currentSelectedBlock
			)
		) {
			setCurrentSlide( currentSelectedBlock );
		}
	}, [ currentSelectedBlock ] );

	return (
		<>
			<div { ...blockProps }>
				<Track
					currentSlide={ currentSlide }
					innerBlocks={ innerBlocks }
					selectSlide={ selectSlide }
					insertSlide={ insertSlide }
				/>
				<InnerBlocks
					renderAppender={ false }
					allowedBlocks={ ALLOWED_BLOCKS }
					defaultBlock={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ false }
				/>
				<Track
					currentSlide={ currentSlide }
					innerBlocks={ innerBlocks }
					selectSlide={ selectSlide }
					insertSlide={ insertSlide }
				/>
			</div>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
};

export default Edit;
