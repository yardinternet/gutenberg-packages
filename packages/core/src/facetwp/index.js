/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

const name = 'yard-blocks/facet-wp';
const icon = 'fal fa-gem';

const settings = {
	title: __( 'Facet', 'yard-blocks' ),
	description: __( 'List Post component', 'yard-blocks' ),
	attributes: {
		selectedFacets: {
			type: 'array',
			default: [],
		},
		selectedTemplate: {
			type: 'object',
			default: {},
		},
	},
	edit,

	save: () => () => null,
};

export { icon, name, settings };
