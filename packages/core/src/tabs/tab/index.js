/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

const icon = 'fas fa-folder';
const name = 'yard-blocks/tabs-tab';

const settings = {
	title: 'Tab',
	parent: [ 'yard-blocks/tabs' ],
	attributes: {
		id: {
			type: 'string',
		},
		title: {
			type: 'string',
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
