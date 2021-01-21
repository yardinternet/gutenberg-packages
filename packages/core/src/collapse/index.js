/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const Icon = <BlockIcon faClasses="fas fa-chevron-double-down" />;

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Uitklap' ),
	category: 'yard-blocks',
	description: __(
		'Voeg uitklapbare blokken toe om inhoud in en uit te kunnen vouwen.'
	),
	icon: {
		src: Icon,
	},
	edit,
	save,
	attributes,
};
