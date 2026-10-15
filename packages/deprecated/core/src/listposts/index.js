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
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const { name, attributes } = metadata;

/**
 * Project specific
 */
const additionalAttributes = applyFilters(
	'yard-blocks.listPostsAdditionalAttributes',
	false
);

const finalAttributes =
	additionalAttributes !== false
		? additionalAttributes.attributes
		: attributes;

export const Icon = <BlockIcon faClasses="fal fa-list-alt" />;
const icon = 'fal fa-list-alt';

const settings = {
	apiVersion: 3,
	title: __( 'Berichtenlijst', 'yard-blocks' ),
	description: __(
		'Voeg allerlei typen content toe en pas deze aan naar wens.'
	),
	attributes: finalAttributes,
	supports: {
		align: [ 'full', 'wide' ],
	},
	edit: withBlockWrapper( edit ),
	save: () => () => null,
};

export { icon, name, settings };
