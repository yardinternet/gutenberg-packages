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
import { useState } from '@wordpress/element';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { Toolbar, IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

// TODO add filter
const TEMPLATE = [ [ 'yard-blocks/timeline-column' ] ];

function Edit( {
	className,
	addColumn,
	setAttributes,
	attributes,
	styles,
	backgroundColorClass,
	spacingClasses,
} ) {
	const {
		fullWidth,
		minHeight,
		rowGutter,
		columnsEqualHeight,
		flexAlignment,
	} = attributes;
	const [ showGridLines, setShowGridLines ] = useState( true );

	const containerClasses = classnames(
		{
			'show-gridlines': showGridLines,
			'no-gutters': rowGutter,
			'columns-equal-height': columnsEqualHeight,
		},
		backgroundColorClass,
		spacingClasses,
		flexAlignment
	);

	return (
		<>
			<div
				className={ classnames(
					!! fullWidth && 'fullwidth',
					className
				) }
			>
				<Inspector { ...{ attributes, setAttributes } } />
				<BlockControls>
					<Toolbar>
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Kolom toevoegen' ) }
							icon="plus"
							onClick={ addColumn }
						/>

						<IconButton
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

						<IconButton
							className={ classnames(
								'components-toolbar__control',
								{
									'is-pressed': fullWidth,
								}
							) }
							label={ __( 'Volledige breedte' ) }
							icon="align-full-width"
							onClick={ () =>
								setAttributes( { fullWidth: ! fullWidth } )
							}
						/>
					</Toolbar>
				</BlockControls>
				<div
					style={ { ...styles, ...{ minHeight } } }
					className={ containerClasses }
				>
					<InnerBlocks
						templateLock="insert"
						allowedBlocks={ [ 'yard-blocks/timeline-column' ] }
						template={ TEMPLATE }
					/>
				</div>
			</div>
		</>
	);
}

export default compose( [
	withDispatch( ( dispatch, ownProps, registry ) => ( {
		addColumn() {
			const { clientId } = ownProps;
			const { getBlocks } = registry.select( 'core/block-editor' );
			const { replaceInnerBlocks } = dispatch( 'core/block-editor' );

			const innerBlocks = getBlocks( clientId );

			const newBlock = createBlock( 'yard-blocks/timeline-column', {} );

			replaceInnerBlocks( clientId, [ ...innerBlocks, newBlock ], false );
		},
	} ) ),
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage(),
	withSpacing(),
] )( Edit );
