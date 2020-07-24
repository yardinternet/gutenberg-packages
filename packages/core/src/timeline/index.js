/**
 * External dependencies
 */
import {
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes, supports } = metadata;
const icon = 'fal fa-grip-lines-vertical';

const settings = {
	title: __( 'Timeline' ),
	description: __( 'Toon content in een tijdlijn vorm' ),
	edit,
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes(),
		...getPaddingAttributes(),
	},
	supports,
	save,
};

export { icon, name, settings };
