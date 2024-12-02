/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const Icon = <BlockIcon faClasses="fal fa-book-open-cover" />;

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
	apiVersion: 2,
	title: __( 'Tolkie widget' ),
	category: 'yard-blocks',
	description: __( 'Voeg de Tolkie widget toe aan een pagina.' ),
	keywords: [ __( 'tolkie' ), __( 'widget' ) ],
	icon: {
		src: Icon,
	},
	edit,
	attributes,
	save: () => {
		return (
			<div className="yard-blocks-tolkie | tolkie-buttons-afterbegin | tolkie-preferred"></div>
		);
	},
};
