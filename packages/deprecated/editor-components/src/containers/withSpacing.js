/**
 * Internal dependencies
 */
/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Higher order component for injecting spacing classes
 *
 * @return { Function } - Higher order component
 */
export const withSpacing = () =>
	createHigherOrderComponent(
		( OriginalComponent ) => ( props ) => {
			const { attributes } = props;
			const {
				marginTop,
				marginRight,
				marginBottom,
				marginLeft,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
			} = attributes;

			const mapClasses = ( attr ) =>
				attr ? Object.values( attr ) : [];

			return (
				<OriginalComponent
					{ ...props }
					spacingClasses={ classnames(
						mapClasses( marginTop ),
						mapClasses( marginRight ),
						mapClasses( marginBottom ),
						mapClasses( marginLeft ),
						mapClasses( paddingTop ),
						mapClasses( paddingRight ),
						mapClasses( paddingBottom ),
						mapClasses( paddingLeft )
					) }
				/>
			);
		},
		'withSpacing'
	);
