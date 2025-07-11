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
import deprecated from './deprecated';

const Icon = <BlockIcon faClasses="far fa-photo-film" />;

const { name, attributes } = metadata;
const icon = 'far fa-photo-film';

const settings = {
	apiVersion: 2,
	title: __( 'Slider', 'yard-blocks' ),
	description: __( 'Voeg slider toe' ),
	category: 'yard-blocks',
	icon: {
		background: '#0293b0',
		foreground: '#fff',
		src: Icon,
	},
	keywords: [
		__( 'slider', 'yard-blocks' ),
		__( 'slide show', 'yard-blocks' ),
		__( 'slideshow', 'yard-blocks' ),
		__( 'carousel', 'yard-blocks' ),
	],
	supports: {
		align: true,
		spacing: {
			margin: true,
			padding: true,
		},
	},
	providesContext: {
		'yard-blocks/slider-active-slide': 'activeSlide',
	},
	edit,
	attributes,
	save,
	deprecated,
};

export { icon, name, settings };
