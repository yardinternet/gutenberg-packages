/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * External dependencies
 */
import {
	withBackground,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

// TODO add filter
const TEMPLATE = [
	[ 'yard-blocks/grid-column' ],
	[ 'yard-blocks/grid-column' ],
];

function Edit( {
	className,
	addColumn,
	setAttributes,
	attributes,
	styles,
	spacingClasses,
	dimRatioClass,
	backgroundFixedClass,
} ) {
	const {
		fullWidth,
		minHeight,
		rowGutter,
		columnsEqualHeight,
		flexAlignment,
		hasContainerPadding,
	} = attributes;
	const [ showGridLines, setShowGridLines ] = useState( true );

	const containerClasses = classnames(
		{
			'show-gridlines': showGridLines,
			'no-gutters': rowGutter,
			'columns-equal-height': columnsEqualHeight,
			'remove-container-padding': ! hasContainerPadding,
		},
		spacingClasses,
		flexAlignment
	);

	return (
		<Fragment>
			<div
				className={ classnames(
					!! fullWidth && 'fullwidth',
					className
				) }
			>
				<Inspector { ...{ attributes, setAttributes } } />
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Kolom toevoegen' ) }
							icon="plus"
							onClick={ addColumn }
						/>

						<ToolbarButton
							className={ classnames(
								'components-toolbar__control',
								{
									'is-pressed': showGridLines,
								}
							) }
							label={ __( 'Verberg rasterlijnen' ) }
							icon="grid-view"
							onClick={ () =>
								setShowGridLines( ! showGridLines )
							}
						/>

						<ToolbarButton
							className={ classnames(
								'components-toolbar__control',
								{
									'is-pressed': fullWidth,
								}
							) }
							label={ __( 'Volledige breedte' ) }
							icon="align-full-width"
							onClick={ () =>
								setAttributes( {
									fullWidth: ! fullWidth,
									isInnerContainerFluid: false,
								} )
							}
						/>
					</ToolbarGroup>
				</BlockControls>
				<div
					style={ { ...styles, ...{ minHeight } } }
					className={ classnames(
						containerClasses,
						dimRatioClass,
						backgroundFixedClass
					) }
				>
					<InnerBlocks
						templateLock="insert"
						allowedBlocks={ [ 'yard-blocks/grid-column' ] }
						template={ TEMPLATE }
					/>
				</div>
			</div>
		</Fragment>
	);
}

export default compose( [
	withDispatch( ( dispatch, ownProps, registry ) => ( {
		addColumn() {
			const { clientId } = ownProps;
			const { getBlocks } = registry.select( 'core/block-editor' );
			const { replaceInnerBlocks } = dispatch( 'core/block-editor' );

			const innerBlocks = getBlocks( clientId );
			const newBlock = createBlock( 'yard-blocks/grid-column', {} );

			replaceInnerBlocks( clientId, [ ...innerBlocks, newBlock ], false );
		},
	} ) ),
	withBackground(),
	withSpacing(),
] )( Edit );
