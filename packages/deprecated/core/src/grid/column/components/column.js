/**
 * External dependencies
 */
import classnames from 'classnames';

const defaultProps = {
	style: null,
	classNames: [],
	innerStyles: null,
	innerClassName: [],
	children: null,
};

function Column( props = defaultProps ) {
	const { style, className, innerStyles, innerClassName, children } = props;
	return (
		<div style={ style } className={ classnames( className ) }>
			<div
				style={ innerStyles }
				className={ classnames( innerClassName ) }
			>
				{ children }
			</div>
		</div>
	);
}

export default Column;
