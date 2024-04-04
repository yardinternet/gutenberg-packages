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
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Row from './components/row';

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
		gradientArray,
	} = attributes;
	const gridStyles = { ...styles, ...{ minHeight } };
	const gridClasses = classnames( className, spacingClasses, {
		'columns-equal-height': columnsEqualHeight,
	} );

	const visibleColumns = gradientArray.filter(
		( entry ) => entry.isHidden !== true && entry.color !== null
	);
	const gradientColors = visibleColumns
		.map( ( entry ) => entry.color )
		.toString();

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
					<div className="container">
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
							<div
								className="yard-blocks-timeline__bar"
								style={ {
									background: `linear-gradient(${ gradientColors })`,
								} }
							/>
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
