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
import { getCardWidth } from './helpers';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export const settings = {
	title: __( 'Kaart' ),
	description: __( 'Plaats een kaart binnen het kaarten blok.' ),
	parent: [ 'yard-blocks/card' ],
	example: {},
	getEditWrapperProps( { parentCardCount } ) {
		const width = getCardWidth( parentCardCount );

		return {
			style: { maxWidth: `${ width }%`, minWidth: `${ width }%` },
		};
	},
	supports: {
		reusable: false,
	},
	edit,
	save,
};

registerBlockType( name, {
	...settings,
	...metadata,
	icon: {
		background: '#0293b0',
		foreground: '#fff',
		src: <BlockIcon faClasses="fas fa-image" />,
	},
} );
