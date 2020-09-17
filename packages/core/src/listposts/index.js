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
import { attributes, name } from './block.json';
// hier checken of er een block.json in het project aanwezig is en dan die pakken

import edit from './edit';

export const Icon = <BlockIcon faClasses="fal fa-list-alt" />;
const icon = 'fal fa-list-alt';

const settings = {
	title: __( 'List Posts', 'yard-blocks' ),
	description: __(
		'Voeg allerlei typen content toe en pas deze aan naar wens'
	),
	attributes,
	edit,
	save: () => () => null,
};

export { icon, name, settings };
