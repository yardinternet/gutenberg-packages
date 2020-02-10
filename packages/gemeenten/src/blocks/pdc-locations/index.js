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

const Icon = <BlockIcon faClasses="fal fa-list-alt" />;

const { name, attributes } = metadata;
const icon = 'fas fa-th';

const settings = {
	title: __( 'Locaties', NAMESPACE ),
	description: __( 'Toont locaties van de PDC' ),
	icon: {
		src: Icon,
	},
	edit,
	attributes,
	save,
};

export { icon, name, settings };
