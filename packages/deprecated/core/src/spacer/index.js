/**
 * External dependencies
 */
import {
	BlockIcon,
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
	apiVersion: 3,
	title: __( 'Witruimte' ),
	category: 'yard-blocks',
	description: __( 'Creëer ruimte tussen blokken en pas de hoogte aan.' ),
	icon: {
		src: Icon,
	},
	edit: withBlockWrapper( edit ),
	save: withV1Save( save ),
	attributes,
};
