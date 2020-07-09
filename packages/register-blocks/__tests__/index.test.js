// @ts-nocheck
import { registerBlocks } from '../src';
import { applyFilters } from '@wordpress/hooks';
import { registerBlockType } from '@wordpress/blocks';

jest.mock( '@wordpress/hooks' );
jest.mock( '@wordpress/blocks' );
jest.mock( '@yardinternet/gutenberg-editor-components', () => {
	return 'icon';
} );

const settings = {
	title: 'Fake component',
	description: '',
	attributes: {},
	save: () => {},
	edit: () => {},
};

const icon = 'fas fa-th';
const name = 'yard-blocks/fake-component';

const block = {
	settings,
	icon,
	name,
};

applyFilters.mockReturnValue( settings );
registerBlockType.mockReturnValueOnce( true );

afterEach( () => {
	jest.clearAllMocks();
} );

describe( 'registerBlocks', () => {
	test( 'registerBlockType should be called 2 times', () => {
		registerBlocks( [ block, block ] );
		expect( registerBlockType ).toHaveBeenCalledTimes( 2 );
	} );

	test( 'registerBlocks with block as string param should throw an error', () => {
		expect( () => {
			registerBlocks( 'test' );
		} ).toThrow( 'Provided argument is not an array' );
	} );

	test( 'applyFilters should be called 1 time', () => {
		registerBlocks( [ block ] );
		expect( applyFilters ).toHaveBeenCalledTimes( 1 );
	} );
} );
