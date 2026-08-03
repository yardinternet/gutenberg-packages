/**
 * WordPress dependencies
 */
import { Dropdown, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FontAwesomeIconPicker from './components/font-awesome-icon-picker.jsx';
import SvgIconPicker from './components/svg-icon-picker.jsx';
import useIconSets from './hooks/use-icon-sets.js';
import './editor.css';

/**
 * Core icon picker control. Automatically selects between the FontAwesome
 * picker and the new SVG-based picker depending on:
 *   1. Whether /yard/icons is reachable (detected on mount).
 *   2. Whether the consumer has provided an `onChangeSVG` callback.
 *
 * If either condition is false, the FontAwesome picker is rendered.
 *
 * @param {Object}   props
 * @param {Function} props.onChange           Called with FA class string when FA picker is used.
 * @param {string}   props.icon               Current FA class string (for legacy preview).
 * @param {boolean}  props.displayIconPreview Show icon preview above search. Default true.
 * @param {boolean}  props.displayAsPopover   Show results in a popover. Default true.
 * @param {boolean}  props.displayDeleteIcon  Show delete button. Default false.
 * @param {Function} props.handleRemove       Called when delete button is clicked.
 * @param {Function} props.onChangeSVG        Called with raw SVG string when SVG picker is used.
 * @param {string}   props.iconSVG            Current SVG markup (for SVG preview).
 */
export const IconPickerControl = ( {
	onChange,
	icon,
	displayIconPreview = true,
	displayAsPopover = true,
	displayDeleteIcon = false,
	handleRemove,
	onChangeSVG,
	iconSVG,
} ) => {
	const { sets, isNewApiAvailable, isLoading } = useIconSets();

	if ( isLoading ) {
		return null;
	}

	if ( isNewApiAvailable && onChangeSVG ) {
		return (
			<SvgIconPicker
				sets={ sets }
				onChangeSVG={ onChangeSVG }
				iconSVG={ iconSVG }
				displayIconPreview={ displayIconPreview }
				displayAsPopover={ displayAsPopover }
				displayDeleteIcon={ displayDeleteIcon }
				handleRemove={ handleRemove }
			/>
		);
	}

	return (
		<FontAwesomeIconPicker
			onChange={ onChange }
			icon={ icon }
			displayIconPreview={ displayIconPreview }
			displayAsPopover={ displayAsPopover }
			displayDeleteIcon={ displayDeleteIcon }
			handleRemove={ handleRemove }
		/>
	);
};

export const IconPickerControlInspector = ( {
	icon,
	onChange,
	displayDeleteIcon = false,
	handleRemove,
	onChangeSVG,
	iconSVG,
} ) => {
	return (
		<IconPickerControl
			icon={ icon }
			onChange={ onChange }
			displayIconPreview={ true }
			displayAsPopover={ true }
			displayDeleteIcon={ displayDeleteIcon }
			handleRemove={ handleRemove }
			onChangeSVG={ onChangeSVG }
			iconSVG={ iconSVG }
		/>
	);
};

export const IconPickerControlToolbar = ( {
	icon,
	onChange,
	onChangeSVG,
	iconSVG,
} ) => {
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
						onChangeSVG={ onChangeSVG }
						iconSVG={ iconSVG }
					/>
				) }
			/>
		</BlockControls>
	);
};
