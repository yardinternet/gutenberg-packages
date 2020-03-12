/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * External dependencies
 */
import React from 'react';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import './assets/css/fontawesome-all.min.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';

/**
 * Internal dependencies
 */
import fontAwesomeIconList from './iconlist';

const iconList = applyFilters(
	'yard-blocks.gutenberg-editor-components.iconPickerList',
	fontAwesomeIconList
);

const attributeRendering = applyFilters(
	'yard-blocks.gutenberg-editor-components.attributeRendering',
	{}
);
const attributeIcons =
	Object.keys( attributeRendering ).length > 0
		? attributeRendering.icons.map( ( obj ) => obj.icon )
		: undefined;
const attributeSearch =
	Object.keys( attributeRendering ).length > 0
		? attributeRendering.icons.map( ( obj ) => obj.search )
		: undefined;

function IconPickerControl( {
	icon = 'fas fa-envelope',
	onChange = () => {},
} ) {
	return (
		<>
			<FontIconPicker
				icons={ attributeIcons ? attributeIcons : iconList }
				search={ attributeSearch }
				renderUsing={
					attributeRendering.data ? attributeRendering.data : 'class'
				}
				value={ icon }
				onChange={ onChange }
			/>
		</>
	);
}

export default IconPickerControl;
