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

export const Icon = <BlockIcon faClasses="fas fa-images" />;

const { name, attributes } = metadata;
const icon = 'fas fa-images';

const settings = {
	title: __( 'Fotocarrousel' ),
	description: __( 'Toont afbeeldingen in een slideshow.' ),
	category: 'yard-blocks',
	styles: [
		{ name: 'default', label: __( 'Standaard' ), isSecondary: true },
		{ name: 'dots', label: __( 'Rond' ) },
		{ name: 'squared', label: __( 'Vierkant' ) },
	],
	edit,
	attributes,
	save: () => () => null,
};

export { icon, name, settings };
