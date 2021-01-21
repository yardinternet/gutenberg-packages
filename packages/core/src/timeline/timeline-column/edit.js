/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	withBackgroundClass,
	withBackgroundImage,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose, withInstanceId } from '@wordpress/compose';
import { Toolbar, IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';

function Edit( {
	attributes,
	instanceId,
	setAttributes,
	className,
	onRemove,
	isSelected,
	styles,
	backgroundColorClass,
	spacingClasses,
	buildGradientArray,
} ) {
	const { isHidden, timelineColor } = attributes;

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
		<>
			<Inspector
				{ ...{
					attributes,
					setAttributes,
					instanceId,
					buildGradientArray,
				} }
			/>
			<BlockControls>
				<Toolbar>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Verwijder' ) }
						icon="no"
						onClick={ onRemove }
					/>
				</Toolbar>
			</BlockControls>
			<div
				style={ styles }
				className={ classnames( backgroundColorClass, className ) }
			>
				<div className={ classnames( 'column', spacingClasses ) }>
					<div
						className={ classnames( 'timeline-step', {
							'd-none': isHidden,
						} ) }
					>
						<span
							className="timeline-step__line"
							style={ { backgroundColor: `${ timelineColor }` } }
						/>
						<span
							className="timeline-step__circle"
							style={ { color: `${ timelineColor }` } }
						/>
					</div>
					<InnerBlocks templateLock={ false } />
				</div>
			</div>
		</>
	);
}

export default compose( [
	withInstanceId,
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
		};
	} ),
	withDispatch( ( dispatch, props, registry ) => {
		const { clientId, rootClientId, getBlocks } = props;

		const { getBlock } = registry.select( 'core/block-editor' );

		const {
			clearSelectedBlock,
			replaceInnerBlocks,
			updateBlockAttributes,
		} = dispatch( 'core/block-editor' );

		return {
			buildGradientArray() {
				const parentBlock = getBlock( rootClientId );

				const gradientArray = parentBlock.innerBlocks.map(
					( { attributes: { timelineColor, isHidden } } ) => ( {
						color: timelineColor,
						isHidden,
					} )
				);

				updateBlockAttributes( rootClientId, {
					...parentBlock.attributes,
					...{ gradientArray },
				} );
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

				this.buildGradientArray();
			},
		};
	} ),
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage(),
	withSpacing(),
] )( Edit );
