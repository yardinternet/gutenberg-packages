/**
 * External dependencies
 */
import classnames from 'classnames';

function ButtonGroup( { children, className, btnWidth, btnAlignment } ) {
	const utilClass = [ `btn-width-${ btnWidth }`, btnAlignment ];

	return (
		<div className={ classnames( className, utilClass ) }>{ children }</div>
	);
}

export default ButtonGroup;
