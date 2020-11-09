/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { attributes, name } from './block.json';
import edit from './edit';

/**
 * Project specific
 */
const additionalAttributes = applyFilters(
	'yard-blocks.listPostsAdditionalAttributes',
	false
);

const finalAttributes = additionalAttributes !== false ? additionalAttributes.attributes : attributes;

export const Icon = <BlockIcon faClasses="fal fa-list-alt" />;
const icon = 'fal fa-list-alt';

const settings = {
	title: __( 'List Posts', 'yard-blocks' ),
	description: __(
		'Voeg allerlei typen content toe en pas deze aan naar wens'
	),
	attributes: finalAttributes,
	edit,
	save: () => () => null,
};

export { icon, name, settings };
