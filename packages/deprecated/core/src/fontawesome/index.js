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

/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

const { name, attributes } = metadata;
const icon = 'fab fa-font-awesome';

const settings = {
	apiVersion: 3,
	title: __( 'Icoon' ),
	description: __(
		'Plaats een FontAwesome icoon op de pagina. Wijzig de kleur en grootte.'
	),
	attributes,
	edit: withBlockWrapper( edit ),
	save: withV1Save( save ),
	deprecated,
};

export { icon, name, settings };
