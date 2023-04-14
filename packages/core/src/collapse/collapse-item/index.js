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

const Icon = <BlockIcon faClasses="fas fa-chevron-down" />;

const { name, attributes } = metadata;
const icon = 'fas fa-chevron-down';

const settings = {
	apiVersion: 2,
	title: __( 'Uitklap item', 'yard-blocks' ),
	description: __( 'Uitklapbaar component.' ),
	parent: [ 'yard-blocks/collapse-list' ],
	category: 'yard-blocks',
	icon: {
		src: Icon,
	},
	edit,
	attributes,
	save,
	deprecated,
};

export { icon, name, settings };
