/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	BlockIcon,
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

import deprecated from './deprecated';

const { name, attributes } = metadata;
const Icon = <BlockIcon faClasses="fas fa-columns" />;

const settings = {
	title: __( 'Grid column' ),
	description: __( 'Grid column' ),
	category: 'yard-blocks',
	parent: [ 'yard-blocks/grid' ],
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes(),
		...getPaddingAttributes(),
	},
	icon: {
		src: Icon,
	},
	supports: {
		inserter: false,
		html: false,
		reusable: false,
	},
	getEditWrapperProps( {
		colClassLg,
		colClass,
		colClassSm,
		colClassXs,
		editIsSelected,
	} ) {
		const isSelected = editIsSelected ? 'is-selected' : '';
		const columnClasses = classnames( [
			!! colClassLg && `col-lg-${ colClassLg }`,
			!! colClass && `col-md-${ colClass }`,
			!! colClassSm && `col-sm-${ colClassSm }`,
			!! colClassXs && `col-${ colClassXs }`,
		] );

		return {
			className: `wp-block editor-block-list__block block-editor-block-list__block yard-blocks-grid-column-container ${ columnClasses } ${ isSelected }`,
		};
	},
	deprecated,
	edit,
	save,
};

export { name, settings };
