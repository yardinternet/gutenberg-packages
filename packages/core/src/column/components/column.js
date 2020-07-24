import React from 'react'; // eslint-disable-line

import {
	withBackgroundClass,
	withBackgroundImage,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

const innerContainerClass = 'column-inner-container';

function Column( {
	attributes,
	className,
	backgroundColorClass,
	children,
	styles,
} ) {
	const {
		id,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		isFlex,
		alignItems,
		flexDirection,
		justifyContent,
		isHidden,
	} = attributes;

	let flexboxClasses = [];

	if ( isFlex ) {
		flexboxClasses = [
			'd-flex',
			alignItems,
			flexDirection,
			justifyContent,
		];
	}

	const containerClass = classnames( [ 'col', `column-${ id }`, className ] );

	const innerWrapperClass = classnames( [
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		innerContainerClass,
		backgroundColorClass,
		flexboxClasses,
		isHidden ? 'd-none--frontend' : '',
	] );

	return (
		<div className={ containerClass }>
			<div style={ styles } className={ innerWrapperClass }>
				{ children }
			</div>
		</div>
	);
}

export default compose(
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage()
)( Column );
