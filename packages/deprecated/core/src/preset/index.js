/**
 * External dependencies
 */
import {
	BlockIcon,
	withBlockWrapper,
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

export const Icon = <BlockIcon faClasses="fal fa-hammer" />;

const { name } = metadata;
const icon = 'fal fa-hammer';

const settings = {
	apiVersion: 3,
	title: __( 'Patroon (sjabloon)' ),
	description: __(
		'Voeg een voorgedefinieerde layout toe en pas de inhoud aan.'
	),
	supports: {
		html: false,
		reusable: false,
	},
	edit: withBlockWrapper( edit ),
	save: () => null,
};

export { icon, name, settings };
