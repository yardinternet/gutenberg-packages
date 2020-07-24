/**
 * External dependencies
 */
import {
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
} from '@yardinternet/gutenberg-editor-components';

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

const { name, attributes } = metadata;
const icon = 'fas fa-columns';

const settings = {
	title: __( 'Tijdlijn kolom' ),
	description: __( 'Tijdlijn kolom content' ),
	parent: [ 'yard-blocks/timeline' ],
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes,
		...getPaddingAttributes,
	},
	supports: {
		inserter: false,
		html: false,
		reusable: false,
	},
	getEditWrapperProps( { colClass, editIsSelected } ) {
		const isSelected = editIsSelected ? 'is-selected' : '';
		return {
			className: `wp-block editor-block-list__block block-editor-block-list__block yard-blocks-grid-column-container col-md-${ colClass } ${ isSelected }`,
		};
	},
	edit,
	save,
};

export { icon, name, settings };
