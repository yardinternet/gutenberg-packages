/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { withBackgroundClass } from '@yardinternet/gutenberg-editor-components';

const { Fragment } = wp.element;

function Card( {
	className,
	attributes,
	children,
	backgroundColorClass,
	styles,
} ) {
	const {
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		elevate,
	} = attributes;

	const classes = classnames( [
		className,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		backgroundColorClass,
		elevate ? 'yard-blocks-card--elevate' : '',
	] );

	return (
		<Fragment>
			<div style={ styles } className={ classes }>
				{ children }
			</div>
		</Fragment>
	);
}

export default compose( withBackgroundClass( 'bgColor' ) )( Card );
