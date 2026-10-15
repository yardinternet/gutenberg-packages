/**
 * External dependencies
 */
import {
	BlockIcon,
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

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
	apiVersion: 3,
	title: __( 'Begroeting', NAMESPACE ),
	description: __( 'Stel een tijd afhankelijke begroeting in.' ),
	icon: {
		src: Icon,
	},
	edit: withBlockWrapper( edit ),
	attributes,
	save: withV1Save( save ),
};

export { icon, name, settings };
