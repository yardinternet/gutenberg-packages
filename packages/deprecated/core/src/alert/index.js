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

/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

const { name, attributes } = metadata;

const icon = 'fas fa-info';

const settings = {
	apiVersion: 3,
	title: __( 'Melding' ),
	description: __(
		'Geef content extra aandacht door middel van een melding.'
	),
	category: 'yard-blocks',
	edit: withBlockWrapper( edit ),
	attributes,
	save: withV1Save( save ),
};

export { icon, name, settings };
