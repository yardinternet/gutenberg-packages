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

const { name, attributes } = metadata;
const icon = 'fas fa-rectangle-wide';

const settings = {
	title: __( 'Knoppengroep', 'yard-blocks' ),
	description: __( 'Groepeer knoppen.' ),
	category: 'yard-blocks',
	keywords: [ __( 'url', 'yard-blocks' ), __( 'link', 'yard-blocks' ) ],
	supports: {},
	edit,
	attributes,
	save,
};

export { icon, name, settings };
