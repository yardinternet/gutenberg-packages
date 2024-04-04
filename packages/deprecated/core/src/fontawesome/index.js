/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';

const { name, attributes } = metadata;
const icon = 'fab fa-font-awesome';

const settings = {
	title: __( 'Icoon' ),
	description: __(
		'Plaats een FontAwesome icoon op de pagina. Wijzig de kleur en grootte.'
	),
	attributes,
	edit,
	save,
	deprecated,
};

export { icon, name, settings };
