/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

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

const Icon = <BlockIcon faClasses="fal fa-icons" />;

const { name, attributes } = metadata;
const icon = 'fal fa-icons';

const settings = {
	apiVersion: 2,
	title: __( 'Icoon', 'yard-blocks' ),
	description: __( 'Voeg een icoon toe' ),
	category: 'yard-blocks',
	icon: {
		background: '#0293b0',
		foreground: '#fff',
		src: Icon,
	},
	keywords: [
		__( 'fontawesome', 'yard-blocks' ),
		__( 'font awesome', 'yard-blocks' ),
		__( 'symbool', 'yard-blocks' ),
	],
	supports: {
		align: true,
		ariaLabel: true,
		color: true,
		spacing: {
			margin: true,
			padding: true,
		},
	},
	edit,
	attributes,
	save,
};

export { icon, name, settings };
