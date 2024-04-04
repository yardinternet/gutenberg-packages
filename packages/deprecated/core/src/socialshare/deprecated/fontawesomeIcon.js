/**
 * External dependencies
 */
import classnames from 'classnames';

const FontAwesomeIcon = ( props ) => {
	const { url, icon, color } = props;
	const classes = classnames(
		'fab',
		`fa-${ icon }`,
		'yard-blocks-socialshare__icon'
	);
	const styles = {
		color,
	};

	return (
		<a
			className="yard-blocks-socialshare__link"
			href={ url }
			rel="noopener noreferrer"
			target="_blank"
		>
			<i style={ styles } className={ classes } />
		</a>
	);
};

export default FontAwesomeIcon;
