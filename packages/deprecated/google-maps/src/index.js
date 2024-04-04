/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes } = metadata;

const settings = {
	title: __( 'Google map uitgebreid', 'yardinternet/google-maps-advanced' ),
	description: __(
		'Toont een Google maps kaart met markergroepen, diverse shapes en filter mogelijkheden.'
	),
	supports: {
		multiple: false,
		reusable: true,
	},
	edit,
	attributes,
	save,
};

export function registerGoogleMaps() {
	registerBlockType( name, {
		...settings,
		...metadata,
		icon: {
			background: '#0293b0',
			foreground: '#fff',
			src: <BlockIcon faClasses="fal fa-map-marked" />,
		},
	} );
}
