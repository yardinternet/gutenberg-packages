import { addFilter } from '@wordpress/hooks';

import { blocks, namespace } from '../../config';
import Save from './save';
import Edit from './edit';

import RegisterBlockType from './register-block-type';

const register = () => {
	addFilter(
		'blocks.getSaveElement',
		`${ namespace }/${ blocks.coreFile }`,
		Save
	);

	addFilter(
		'editor.BlockEdit',
		`${ namespace }/${ blocks.coreFile }`,
		Edit
	);

	addFilter(
		'blocks.registerBlockType',
		`${ namespace }/${ blocks.coreFile }`,
		RegisterBlockType
	);
};

const name = blocks.coreFile;

export { register, name };
