/**
 * External dependencies
 */
import { withBlockWrapper } from '@yardinternet/gutenberg-editor-components';

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
	apiVersion: 3,
	title: __( 'Navigatiemenu' ),
	description: __( 'Plaats een navigatiemenu.' ),
	attributes,
	edit: withBlockWrapper( edit ),

	save: () => () => null,
};

export { icon, name, settings };
