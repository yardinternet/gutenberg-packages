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

const Icon = <BlockIcon faClasses="far fa-film" />;

const { name, attributes } = metadata;
const icon = 'far fa-film';

const settings = {
	apiVersion: 2,
	title: __( 'Slide', 'yard-blocks' ),
	description: __( 'Een enkele slide binnen een slider blok.' ),
	category: 'yard-blocks',
	parent: [ 'yard-blocks/slider' ],
	icon: {
		background: '#0293b0',
		foreground: '#fff',
		src: Icon,
	},
	usesContext: [ 'yard-blocks/slider-active-slide' ],
	edit,
	attributes,
	save,
};

export { icon, name, settings };
