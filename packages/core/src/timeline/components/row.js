/**
 * External dependencies
 */
import classnames from 'classnames';

function Row( { children, attributes, style, flexAlignment } ) {
	const { rowGutter } = attributes;

	return (
		<div
			style={ style }
			className={ classnames(
				'row',
				{ 'no-gutters': rowGutter },
				flexAlignment
			) }
		>
			{ children }
		</div>
	);
}

export default Row;
