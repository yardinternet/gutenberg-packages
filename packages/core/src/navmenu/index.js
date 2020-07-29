/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { attributes, name } from './settings';

import edit from './edit';

const icon = 'fal fa-bars';

const settings = {
	title: __( 'Nav menu' ),
	description: __( 'Toont navigatiemenu' ),
	attributes,
	edit,

	save: () => () => null,
};

export { icon, name, settings };
