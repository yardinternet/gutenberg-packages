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
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

// Child component
import './card';

export const settings = {
	apiVersion: 3,
	title: __( 'Kaarten' ),
	description: __(
		'Kies een kaart sjabloon en plaats de kaart waarvan je de inhoud vrij kunt invullen.'
	),
	example: {},
	supports: {},
	edit: withBlockWrapper( edit ),
	save: withV1Save( save ),
	deprecated,
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
