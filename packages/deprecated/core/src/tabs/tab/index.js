/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

const icon = 'fas fa-folder';
const name = 'yard-blocks/tabs-tab';

const parent = 'yard-blocks/tabs';

const settings = {
	apiVersion: 3,
	title: __( 'Tabblad' ),
	parent: [ parent ],
	attributes: {
		id: {
			type: 'string',
		},
		title: {
			type: 'string',
		},
		defaultTab: {
			type: 'string',
		},
	},
	supports: {
		inserter: false,
		html: false,
		reusable: false,
	},
	edit: withBlockWrapper( edit ),
	save: withV1Save( save ),
};

export { icon, name, settings };
