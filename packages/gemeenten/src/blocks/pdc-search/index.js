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
import save from './save';

const Icon = <BlockIcon faClasses="fal fa-search" />;

const { name, attributes } = metadata;

const settings = {
	title: __( 'Zoeken', NAMESPACE ),
	description: __(
		'Doorzoek de gehele website, inclusief OpenPub artikelen en OpenPDC items.'
	),
	icon: {
		src: Icon,
	},
	supports: {
		multiple: false,
		reusable: false,
	},
	edit,
	attributes,
	save,
};

export { name, settings };
