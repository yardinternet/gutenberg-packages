/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { cloneBlock } from '@wordpress/blocks';

/**
 * External dependencies
 */
import {
	withBackground,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Column from './components/column';
import {
	BlockVisibilityControls,
	BlockVisibilityOverlay,
} from '../components/block-visibility';

function Edit( {
	attributes,
	setAttributes,
	className,
	onDuplicate,
	onRemove,
	onMove,
	hasNext,
	hasPrev,
	isSelected,
	styles,
	backgroundColorClass,
	dimRatioClass,
	backgroundFixedClass,
	spacingClasses,
} ) {
	const { displayBlock } = attributes;

	/**
	 * Weird bug on sites that bootstrap the blocks from yard-blocks. On these sites
	 * the displayBlock attribute starts as undefined, breaking the column and making
	 * all colums invisible.
	 */
	useEffect( () => {
		if ( typeof displayBlock === 'undefined' ) {
			setAttributes( { displayBlock: true } );
		}
	}, [] );

	/**
	 * Used in getEditWrapperProps
	 * ClassName or isSelected are not passed to getEditWrapperProps()
	 * Only attributes are available
	 */
	useEffect( () => {
		setAttributes( {
			editIsSelected: isSelected,
		} );
	}, [ isSelected ] );

	return (
		<Fragment>
			<BlockVisibilityControls
				displayBlock={ displayBlock }
				setAttributes={ setAttributes }
			/>
			{ ! displayBlock && (
				<BlockVisibilityOverlay name={ __( 'Rasterkolom' ) } />
			) }
			<Inspector { ...{ attributes, setAttributes } } />
			<BlockControls>
				<ToolbarGroup label={ __( 'Instellingen' ) }>
					{ isSelected && hasPrev && (
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Verplaats naar links' ) }
							icon="arrow-left-alt"
							onClick={ () => onMove( '-' ) }
						/>
					) }
					{ isSelected && hasNext && (
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Verplaats naar rechts' ) }
							icon="arrow-right-alt"
							onClick={ () => onMove( '+' ) }
						/>
					) }
					<ToolbarButton
						className="components-toolbar__control"
						label={ __( 'Dupliceer' ) }
						icon="admin-page"
						onClick={ onDuplicate }
					/>
					<ToolbarButton
						className="components-toolbar__control"
						label={ __( 'Verwijderen' ) }
						icon="no"
						onClick={ onRemove }
					/>
				</ToolbarGroup>
			</BlockControls>
			<Column
				className={ [
					backgroundColorClass,
					dimRatioClass,
					backgroundFixedClass,
					className,
				] }
				innerClassName={ [ 'column', spacingClasses ] }
				innerStyles={ styles }
			>
				<InnerBlocks templateLock={ false } />
			</Column>
		</Fragment>
	);
}

/**
 * Dynamic operators
 */
const operators = {
	'+': ( a, b ) => a + b,
	'-': ( a, b ) => a - b,
};

export default compose( [
	withSelect( ( select, props ) => {
		const {
			getBlocksByClientId,
			getBlockRootClientId,
			getBlocks,
			getBlockIndex,
		} = select( 'core/block-editor' );

		const { clientId } = props;

		const blocks = getBlocksByClientId( clientId );
		const rootClientId = getBlockRootClientId( clientId );
		const currentBlockIndex = getBlockIndex( clientId, rootClientId );

		return {
			getBlocks,
			blocks,
			rootClientId,
			currentBlockIndex,
			hasNext: currentBlockIndex + 1 !== getBlocks( rootClientId ).length,
			hasPrev: currentBlockIndex !== 0,
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			clientId,
			rootClientId,
			blocks,
			getBlocks,
			currentBlockIndex,
		} = props;

		const {
			replaceInnerBlocks,
			moveBlockToPosition,
			selectNextBlock,
			clearSelectedBlock,
		} = dispatch( 'core/block-editor' );

		return {
			onDuplicate() {
				const clonedBlocks = blocks.map( ( block ) =>
					cloneBlock( block )
				);
				const innerBlocks = getBlocks( rootClientId );

				if ( clonedBlocks ) {
					innerBlocks.splice(
						currentBlockIndex + 1,
						0,
						clonedBlocks[ 0 ]
					);
					replaceInnerBlocks( rootClientId, innerBlocks, false );
					selectNextBlock( clientId );
				}
			},
			onMove( action = '+' ) {
				moveBlockToPosition(
					clientId,
					rootClientId,
					rootClientId,
					operators[ action ]( currentBlockIndex, 1 )
				);
			},
			onRemove() {
				const innerBlocks = getBlocks( rootClientId );
				const filterBlocks = innerBlocks.filter(
					( block ) => block.clientId !== clientId
				);

				if ( filterBlocks ) {
					replaceInnerBlocks( rootClientId, filterBlocks );
					clearSelectedBlock( clientId );
				}
			},
		};
	} ),
	withBackground(),
	withSpacing(),
] )( Edit );
