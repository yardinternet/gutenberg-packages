/**
 * External dependencies
 */
import classnames from 'classnames';

function Card( props ) {
	const { children, className, innerCardClass, styles } = props;

	return (
		<li style={ styles } className={ className }>
			<div
				className={ `yard-block-card__inner ${ classnames(
					innerCardClass
				) }` }
			>
				{ children }
			</div>
		</li>
	);
}

export default Card;
