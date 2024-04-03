/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconPickerControl } from './icon-picker-control';

export const IconPickerControlToolbar = ( { icon, onChange } ) => {
	return (
		<BlockControls>
			<Dropdown
				contentClassName="icon-picker-control-popover"
				renderToggle={ ( { isOpen, onToggle } ) => (
					<ToolbarGroup>
						<ToolbarButton
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ __( 'Kies icoon' ) }
						</ToolbarButton>
					</ToolbarGroup>
				) }
				renderContent={ () => (
					<IconPickerControl
						icon={ icon }
						onChange={ onChange }
						displayIconPreview={ false }
						displayAsPopover={ false }
					/>
				) }
			/>
		</BlockControls>
	);
};
