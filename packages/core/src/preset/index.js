/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

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
	title: __( 'Preset' ),
	description: __( 'Voeg binnen blokken een preset toe' ),
	supports: {
		html: false,
		reusable: false,
	},
	edit,
	save: () => null,
};

export { icon, name, settings };
