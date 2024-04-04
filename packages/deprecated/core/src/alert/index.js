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

const icon = 'fas fa-info';

const settings = {
	title: __( 'Melding' ),
	description: __(
		'Geef content extra aandacht door middel van een melding.'
	),
	category: 'yard-blocks',
	edit,
	attributes,
	save,
};

export { icon, name, settings };
