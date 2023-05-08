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
	apiVersion: 2,
	title: __( 'Tabbladen' ),
	description: __(
		'Groepeer gemakkelijk content in verschillende tabbladen.'
	),
	edit,
	attributes,
	supports: {
		align: [ 'full', 'wide' ],
	},
	save,
	deprecated,
};

export { icon, name, settings };
