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

const Icon = <BlockIcon faClasses="fal fa-mitten" />;

const { name, attributes } = metadata;
const icon = 'fas fa-th';

const settings = {
	title: __( 'Begroeting', NAMESPACE ),
	description: __( 'Stel een tijd afhankelijke begroeting in.' ),
	icon: {
		src: Icon,
	},
	edit,
	attributes,
	save,
};

export { icon, name, settings };
