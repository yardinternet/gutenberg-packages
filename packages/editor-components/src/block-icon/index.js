/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';

const BlockIcon = ( { faClasses, marginRight = false } ) => {
	const styles = {
		marginRight: '5px',
	};

	return (
		<Icon
			icon={ () => (
				<i
					style={ marginRight ? styles : {} }
					className={ classnames(
						'yard-blocks__block-icon',
						faClasses
					) }
				></i>
			) }
		/>
	);
};

export default BlockIcon;
