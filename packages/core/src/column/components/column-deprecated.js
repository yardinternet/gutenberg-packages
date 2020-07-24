/**
 * External dependencies
 */
import classnames from 'classnames';
import { getBackgroundClassByColor } from '@yardinternet/gutenberg-editor-components';

const innerContainerClass = 'column-inner-container';

const ColumnDeprecated = ( props ) => {
	const { attributes, className } = props;
	const {
		id,
		marginTopClass,
		marginBottomClass,
		paddingClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		alignItems,
		flexDirection,
		justifyContent,
		bgColor,
		bgImgUrl,
	} = attributes;

	const bgColorClass = getBackgroundClassByColor(
		yardBlocks.editorColorPalette,
		bgColor
	);

	const styles = {};

	if ( bgImgUrl ) {
		styles.backgroundImage = `url("${ bgImgUrl }")`;
	}

	const containerClass = classnames( [ 'col', `column-${ id }`, className ] );

	const innerWrapperClass = classnames( [
		paddingClass,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
		innerContainerClass,
		alignItems,
		flexDirection,
		justifyContent,
		bgColorClass ? bgColorClass : '',
	] );

	return (
		<div className={ containerClass }>
			<div style={ styles } className={ innerWrapperClass }>
				{ props.children }
			</div>
		</div>
	);
};

export default ColumnDeprecated;
