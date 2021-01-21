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
import { NAMESPACE } from '../../config/settings';
import metadata from './block.json';
import edit from './edit';

export const Icon = <BlockIcon faClasses="fal fa-list-alt" />;

const { name, attributes } = metadata;

const settings = {
	title: __( 'Berichtenlijst OpenPub', NAMESPACE ),
	description: __( 'Haal berichten op uit OpenPub.' ),
	icon: {
		src: Icon,
	},
	attributes,
	edit,
	save: () => () => null,
};

export { name, settings };
