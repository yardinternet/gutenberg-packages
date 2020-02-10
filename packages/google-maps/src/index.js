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
	title: __( 'Google map geavanceerd', 'yardinternet/google-maps' ),
	description: __( 'Toont Google maps' ),
	supports: {
		multiple: false,
		reusable: false,
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
			src: <BlockIcon faClasses="fas fa-images" />,
		},
	} );
}
