/**
 * External dependencies
 */
import React from 'react';
import { css, cx } from 'emotion';

function Icon( props ) {
	const { attributes } = props;
	const { icon, iconColor, iconSize, altText } = attributes;

	const classname = 'yard-blocks-iconlist__icon';
	const styles = css`
		margin-right: 1rem;
	`;

	return (
		<i
			className={ cx( classname, styles, icon ) }
			style={ { color: iconColor, fontSize: iconSize } }
			title={ altText ? altText : null }
		></i>
	);
}

export default Icon;
