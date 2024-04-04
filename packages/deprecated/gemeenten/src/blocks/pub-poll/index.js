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

export const Icon = <BlockIcon faClasses="fas fa-poll-people" />;

const { name, attributes } = metadata;

const settings = {
	title: __( 'Poll', NAMESPACE ),
	description: __( 'Selecteer een poll uit de OpenPub.', NAMESPACE ),
	icon: {
		src: Icon,
	},
	attributes,
	edit,
	save,
};

export { name, settings };
