/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import deprecated from './deprecated';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes } = metadata;
const icon = 'fas fa-folder';

const settings = {
	title: __( 'Tabs' ),
	description: __( 'Groupeer content in verschillende tabs' ),
	edit,
	attributes,
	supports: {
		html: false,
		reusable: false,
	},
	save,
	deprecated,
};

export { icon, name, settings };
