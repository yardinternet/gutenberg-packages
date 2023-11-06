/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Add hideColumn toggle button to the block toolbar.
 *
 * @param {Function} BlockEdit - Original component.
 */
const addVisibilityToggleButton = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== 'core/column' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { hideColumn } = attributes;

		return (
			<>
				<BlockControls>
					<ToolbarButton
						icon={ hideColumn ? 'hidden' : 'visibility' }
						label="Zichtbaarheid van kolom aanpassen"
						onClick={ () =>
							setAttributes( { hideColumn: ! hideColumn } )
						}
						isActive={ hideColumn }
					/>
				</BlockControls>
				<BlockEdit { ...props } />
			</>
		);
	};
} );

export default addVisibilityToggleButton;
