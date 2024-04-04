/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

import {
	withBackground,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import Row from './components/row';

function save( {
	className,
	attributes,
	styles,
	dimRatioClass,
	backgroundFixedClass,
	spacingClasses,
} ) {
	const {
		fullWidth,
		minHeight,
		columnsEqualHeight,
		flexAlignment,
		isInnerContainerFluid,
		hasContainerPadding,
		displayBlock,
	} = attributes;
	const gridStyles = { ...styles, ...{ minHeight } };
	const gridClasses = classnames( className, spacingClasses, {
		'columns-equal-height': columnsEqualHeight,
		'remove-container-padding': ! hasContainerPadding,
	} );

	const containerClass = isInnerContainerFluid
		? 'container-fluid'
		: 'container';

	return (
		<Fragment>
			{ fullWidth ? (
				<div
					style={ gridStyles }
					className={ classnames(
						'container-fluid',
						gridClasses,
						dimRatioClass,
						backgroundFixedClass,
						flexAlignment,
						! displayBlock && 'd-none is-hidden'
					) }
				>
					<div className={ containerClass }>
						<Row attributes={ attributes }>
							<InnerBlocks.Content />
						</Row>
					</div>
				</div>
			) : (
				<div
					className={ classnames(
						'container',
						gridClasses,
						! displayBlock && 'd-none is-hidden'
					) }
				>
					<div
						style={ gridStyles }
						className={ classnames(
							dimRatioClass,
							backgroundFixedClass
						) }
					>
						<Row
							attributes={ attributes }
							flexAlignment={ flexAlignment }
						>
							<InnerBlocks.Content />
						</Row>
					</div>
				</div>
			) }
		</Fragment>
	);
}

export default compose( [ withBackground(), withSpacing() ] )( save );
