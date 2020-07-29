/**
 * External dependencies
 */
import classnames from 'classnames';

const FontAwesomeIconStacked = ( { icon, color, type, font } ) => {
	const classes = classnames(
		font,
		`fa-${ icon }`,
		'yard-blocks-socialshare__icon',
		'fa-stack-1x fa-inverse'
	);
	const styles = {
		color,
	};

	return (
		<span className="fa-stack">
			<i className={ `fas fa-${ type } fa-stack-2x` }></i>
			<i style={ styles } className={ classes } />
		</span>
	);
};

export default FontAwesomeIconStacked;
