/**
 * External dependencies
 */
import {
	withBackground,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Toolbar, IconButton } from '@wordpress/components';
import { cloneBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Column from './components/column';

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
			<Inspector { ...{ attributes, setAttributes } } />
			<BlockControls>
				<Toolbar>
					{ isSelected && hasPrev && (
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Move left' ) }
							icon="arrow-left-alt"
							onClick={ () => onMove( '-' ) }
						/>
					) }
					{ isSelected && hasNext && (
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Move right' ) }
							icon="arrow-right-alt"
							onClick={ () => onMove( '+' ) }
						/>
					) }
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Clone' ) }
						icon="admin-page"
						onClick={ onDuplicate }
					/>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Remove' ) }
						icon="no"
						onClick={ onRemove }
					/>
				</Toolbar>
			</BlockControls>
			<Column
				style={ styles }
				className={ [
					backgroundColorClass,
					dimRatioClass,
					backgroundFixedClass,
					className,
				] }
				innerClassName={ [ 'column', spacingClasses ] }
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
