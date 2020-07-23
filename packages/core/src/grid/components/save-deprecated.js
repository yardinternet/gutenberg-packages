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

/**
 * Internal dependencies
 */
import { withBackgroundClass } from '../../../Containers/withBackgroundClass';
import { withBackgroundImage } from '../../../Containers/withBackgroundImage';
import { withSpacing } from '../../../Containers/withSpacing';

import Row from './row';

function save( {
	className,
	attributes,
	styles,
	backgroundColorClass,
	spacingClasses,
} ) {
	const {
		fullWidth,
		minHeight,
		columnsEqualHeight,
		flexAlignment,
	} = attributes;
	const gridStyles = { ...styles, ...{ minHeight } };
	const gridClasses = classnames( className, spacingClasses, {
		'columns-equal-height': columnsEqualHeight,
	} );

	return (
		<Fragment>
			{ fullWidth ? (
				<div
					style={ gridStyles }
					className={ classnames(
						gridClasses,
						'container-fluid',
						backgroundColorClass,
						flexAlignment
					) }
				>
					<div className="container cc-ready">
						<Row attributes={ attributes }>
							<InnerBlocks.Content />
						</Row>
					</div>
				</div>
			) : (
				<div className={ classnames( gridClasses, 'container' ) }>
					<div
						style={ gridStyles }
						className={ classnames( backgroundColorClass ) }
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

export default compose( [
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage(),
	withSpacing(),
] )( save );
