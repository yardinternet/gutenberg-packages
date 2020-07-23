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
import deprecated from './deprecated';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes, supports } = metadata;
const icon = 'fas fa-th';

const settings = {
	title: __( 'Grid' ),
	description: __( 'Layout builder' ),
	edit,
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes(),
		...getPaddingAttributes(),
	},
	deprecated,
	supports,
	save,
};

export { settings, name, icon };
