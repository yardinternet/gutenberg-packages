/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { namespace, coreFileFilesize } from '../../../config';
import Save from './save';
import Edit from './edit';

import RegisterBlockType from './register-block-type';

const { name } = coreFileFilesize;

const register = ( config ) => {
	addFilter(
		'blocks.getSaveElement',
		`${ namespace }/${ name }`,
		( element, blockType, attributes ) =>
			// It's possible to pass a config from your project
			Save( element, blockType, attributes, config )
	);
	addFilter( 'editor.BlockEdit', `${ namespace }/${ name }`, Edit );
	addFilter(
		'blocks.registerBlockType',
		`${ namespace }/${ name }`,
		RegisterBlockType
	);
};

export { register, name };
