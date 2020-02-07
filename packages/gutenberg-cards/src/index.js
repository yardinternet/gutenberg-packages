/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

// Child component
import './card';

export const settings = {
	title: 'Cards',
	description: __( 'Container cards' ),
	example: {},
	supports: {},
	edit,
	save,
};

const { name } = metadata;

export function registerGutenbergCards() {
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
