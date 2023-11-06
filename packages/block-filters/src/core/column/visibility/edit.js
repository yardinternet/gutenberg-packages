/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Add a class to the column block if hideColumn is true.
 *
 * @param {Function} BlockListBlock - Original component.
 */
const addVisibilityClassToEditor = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const {
				attributes: { hideColumn },
				className,
				name,
			} = props;

			if ( name !== 'core/column' ) {
				return <BlockListBlock { ...props } />;
			}

			return (
				<BlockListBlock
					{ ...props }
					className={
						hideColumn ? `${ className } is-hidden` : className
					}
				/>
			);
		};
	},
	'withClientIdClassName'
);

export default addVisibilityClassToEditor;
