/**
 * Internal dependencies
 */
import CardEdit from './edit';
import CardSave from './save';

/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const name = 'yard-blocks/card';
const icon = 'fas fa-copy'; // dffs

const settings = {
	apiVersion: 3,
	title: __( 'Kaart', 'yard-blocks' ),
	description: __( 'Plaats een kaart in de pagina.', 'yard-blocks' ),

	attributes: {
		url: {
			type: 'string',
		},
		marginTopClass: {
			type: 'string',
			default: '',
		},
		marginBottomClass: {
			type: 'string',
			default: '',
		},
		paddingTopClass: {
			type: 'string',
			default: '',
		},
		paddingBottomClass: {
			type: 'string',
			default: '',
		},
		paddingLeftClass: {
			type: 'string',
			default: '',
		},
		paddingRightClass: {
			type: 'string',
			default: '',
		},
		bgColor: {
			type: 'string',
			default: '',
		},
		elevate: {
			type: 'boolean',
		},
	},
	edit: withBlockWrapper( CardEdit ),
	save: withV1Save( CardSave ),
};

export { icon, name, settings };
