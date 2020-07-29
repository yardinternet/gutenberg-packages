/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

const name = 'yard-blocks/google-map';
const icon = 'fal fa-map';

const settings = {
	title: __( 'Google map' ),
	description: __( 'Google map' ),
	attributes: {
		points: {
			type: 'array',
			default: [],
		},
		apiKey: {
			type: 'string',
			default: '',
		},
		mapOptions: {
			type: 'string',
		},
		markerIcon: {
			type: 'string',
		},
		fitBounds: {
			type: 'boolean',
			default: false,
		},
		url: {
			type: 'string',
		},
	},
	supports: {},

	edit,

	save: () => null,
};

export { icon, name, settings };
