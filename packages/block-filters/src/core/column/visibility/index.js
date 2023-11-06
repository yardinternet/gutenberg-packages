/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import addVisibilityAttribute from './attributes';
import addVisibilityToggleButton from './inspector';
import addVisibilityClassToEditor from './edit';
import addVisibilityClassToSave from './save';

import { namespace, coreColumnVisibility } from '../../../config';

const { name } = coreColumnVisibility;

const register = () => {
	addFilter(
		'blocks.registerBlockType',
		`${ namespace }/${ name }`,
		addVisibilityAttribute
	);

	addFilter(
		'editor.BlockEdit',
		`${ namespace }/${ name }`,
		addVisibilityToggleButton
	);

	addFilter(
		'editor.BlockListBlock',
		`${ namespace }/${ name }`,
		addVisibilityClassToEditor
	);

	addFilter(
		'blocks.getSaveContent.extraProps',
		`${ namespace }/${ name }`,
		addVisibilityClassToSave
	);
};

export { register, name };
