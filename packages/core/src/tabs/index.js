/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes } = metadata;
const icon = 'fas fa-folder';

const settings = {
	title: __( 'Tabbladen' ),
	description: __(
		'Groepeer gemakkelijk content in verschillende tabbladen.'
	),
	edit,
	attributes,
	save,
	deprecated,
};

export { icon, name, settings };
