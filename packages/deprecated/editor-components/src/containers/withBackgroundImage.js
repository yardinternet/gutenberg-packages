/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { omitUndefined } from '../utils-yard-blocks/omit-undefined';

/**
 * Higher order component for injecting background css properties
 *
 * @deprecated since 0.4.2, use withBackground and Components/withBackground
 *
 * @return { Function } - Higher order component
 */
export const withBackgroundImage = () =>
	createHigherOrderComponent(
		( OriginalComponent ) => ( props ) => {
			const { attributes, styles } = props;
			const { bgImgUrl, bgRepeat, bgSize, bgPosition } = attributes;

			const backgroundStyles = {
				backgroundImage: bgImgUrl ? `url(${ bgImgUrl })` : undefined,
				backgroundRepeat: bgRepeat,
				backgroundSize: bgSize,
				backgroundPosition: bgPosition,
			};

			return (
				<OriginalComponent
					{ ...props }
					styles={ {
						...styles,
						...omitUndefined( backgroundStyles ),
					} }
				/>
			);
		},
		'withBackgroundImage'
	);
