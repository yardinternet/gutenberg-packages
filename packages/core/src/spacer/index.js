/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './components/save';

const Icon = <BlockIcon faClasses="fal fa-arrows-v" />;

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
	title: 'Spacer',
	category: 'yard-blocks',
	description: __( 'Voeg ruimte tussen blokken toe.' ),
	icon: {
		src: Icon,
	},
	edit,
	save,
	attributes,
};
