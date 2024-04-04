/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { getClassesByLayoutID } from '../layout';
import {
	withBackgroundClass,
	withBackgroundImage,
} from '@yardinternet/gutenberg-editor-components';

function Row( {
	className,
	attributes,
	backgroundColorClass,
	children,
	styles,
} ) {
	const {
		align,
		columnsEqualHeight,
		layoutDesktop,
		layoutTablet,
		layoutMobile,
		bgImgUrl,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		rowStyles,
		alignVertical,
		rowGutter,
		hasColumnContainer,
	} = attributes;

	const containerClass = classNames( [
		className,
		align === 'wide' ? 'container' : 'container-fluid',
		`align-items-${ alignVertical }`,
		bgImgUrl ? 'has-bg-img' : '',
		backgroundColorClass,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
	] );

	const rowClass = classNames( [
		'row',
		getClassesByLayoutID( layoutDesktop ),
		getClassesByLayoutID( layoutTablet ),
		getClassesByLayoutID( layoutMobile ),
		columnsEqualHeight ? 'columns-equal-height' : '',
		! rowGutter ? 'no-gutters' : '',
		hasColumnContainer ? 'column-max-width' : '',
	] );

	return (
		<div style={ { ...styles, ...rowStyles } } className={ containerClass }>
			<div className={ rowClass }>{ children }</div>
		</div>
	);
}

export default compose(
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage()
)( Row );
