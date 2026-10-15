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
const icon = 'fas fa-rectangle-wide';

const settings = {
	apiVersion: 3,
	title: __( 'Knoppengroep', 'yard-blocks' ),
	description: __( 'Groepeer knoppen.' ),
	category: 'yard-blocks',
	keywords: [ __( 'url', 'yard-blocks' ), __( 'link', 'yard-blocks' ) ],
	supports: {},
	edit: withBlockWrapper( edit ),
	attributes,
	save: withV1Save( save ),
};

export { icon, name, settings };
