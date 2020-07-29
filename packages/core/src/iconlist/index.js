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

const Icon = <BlockIcon faClasses="fal fa-list-alt" />;

const { name, attributes } = metadata;
const icon = 'fas fa-th';

const settings = {
	title: __( 'Icon List', 'yard-blocks' ),
	description: __( 'Example' ),
	category: 'yard-blocks',
	icon: {
		background: '#0293b0',
		foreground: '#fff',
		src: Icon,
	},
	keywords: [ __( 'url', 'yard-blocks' ), __( 'link', 'yard-blocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	attributes,
	save,
};

export { icon, name, settings };
