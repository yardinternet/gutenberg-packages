/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

const icon = 'fas fa-folder';
const name = 'yard-blocks/tabs-tab';

const parent = 'yard-blocks/tabs';

const settings = {
	title: __( 'Tabblad' ),
	parent: [ parent ],
	usesContext: [
		[ `${ parent }/defaultTab` ],
		[ `${ parent }/defaultTabEnabled` ],
	],
	attributes: {
		id: {
			type: 'string',
		},
		title: {
			type: 'string',
		},
		defaultTab: {
			type: 'boolean',
		},
		defaultTabEnabled: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		inserter: false,
		html: false,
		reusable: false,
	},
	edit,
	save,
};

export { icon, name, settings };
