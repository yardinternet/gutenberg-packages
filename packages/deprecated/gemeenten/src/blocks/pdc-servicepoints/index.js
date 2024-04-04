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

export const Icon = <BlockIcon faClasses="fas fa-location-arrow" />;

const { name, attributes } = metadata;

const settings = {
	title: __( 'Servicepunten', NAMESPACE ),
	description: __( 'Haal servicepunten op uit de OpenPDC.', NAMESPACE ),
	icon: {
		src: Icon,
	},
	attributes,
	edit,
	save: () => () => null,
};

export { name, settings };
