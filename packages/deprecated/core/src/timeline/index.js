/**
 * External dependencies
 */
import {
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
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
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes, supports } = metadata;
const icon = 'fal fa-grip-lines-vertical';

const settings = {
	apiVersion: 3,
	title: __( 'Tijdlijn' ),
	description: __( 'Toon inhoud in de vorm van een tijdlijn.' ),
	edit: withBlockWrapper( edit ),
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes(),
		...getPaddingAttributes(),
	},
	supports,
	save: withV1Save( save ),
};

export { icon, name, settings };
