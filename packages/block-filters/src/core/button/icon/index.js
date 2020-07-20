/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { namespace, coreButtonIcon } from '../../../config';
import Save from './save';
import Edit from './edit';
import RegisterBlockType from './register-block-type';

const { name } = coreButtonIcon;

const register = ( config ) => {
	addFilter(
		'blocks.getSaveElement',
		`${ namespace }/${ name }`,
		( element, blockType, attributes ) =>
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
