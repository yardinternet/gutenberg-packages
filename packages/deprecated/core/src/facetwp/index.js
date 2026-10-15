/**
 * External dependencies
 */
import { withBlockWrapper } from '@yardinternet/gutenberg-editor-components';

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
	apiVersion: 3,
	title: __( 'Filtering', 'yard-blocks' ),
	description: __( 'Plaats filtering op de pagina.', 'yard-blocks' ),
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
	edit: withBlockWrapper( edit ),

	save: () => () => null,
};

export { icon, name, settings };
