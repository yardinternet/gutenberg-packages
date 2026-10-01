import { addFilter } from '@wordpress/hooks';
import {
	getConditionalAllowedBlocks,
	registerBlockRestrictions,
} from '../src';

jest.mock( '@wordpress/hooks' );

const blockSets = { minimal: [ 'core/paragraph', 'core/heading' ] };

const rule = {
	when: [
		{ className: 'grid-cards', add: [ 'theme/card' ] },
		{
			className: 'grid-mixed',
			postType: [ 'page', 'news' ],
			blockSet: 'minimal',
			remove: [ 'core/heading' ],
		},
		{ parentVariation: 'login', add: [ 'theme/login' ] },
		{ postType: 'pdc-item', add: [ 'theme/card', 'yard/query' ] },
	],
};

describe( 'getConditionalAllowedBlocks', () => {
	it( 'matches on className', () => {
		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [ 'foo', 'grid-cards' ], postType: 'pdc-item' },
				blockSets
			)
		).toEqual( [ 'theme/card' ] );
	} );

	it( 'requires all matchers and treats arrays as any-of', () => {
		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [ 'grid-mixed' ], postType: 'news' },
				blockSets
			)
		).toEqual( [ 'core/paragraph' ] );

		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [ 'grid-mixed' ], postType: 'post' },
				blockSets
			)
		).toBeUndefined();
	} );

	it( 'matches on parent variation', () => {
		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [], parentVariation: 'login' },
				blockSets
			)
		).toEqual( [ 'theme/login' ] );
	} );

	it( 'falls through to later conditions', () => {
		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [ '' ], postType: 'pdc-item' },
				blockSets
			)
		).toEqual( [ 'theme/card', 'yard/query' ] );
	} );
} );

describe( 'registerBlockRestrictions', () => {
	beforeEach( () => addFilter.mockClear() );

	const getTypeFilter = () =>
		addFilter.mock.calls.find(
			( [ hook ] ) => 'blocks.registerBlockType' === hook
		)[ 2 ];

	const hasBlockEditFilter = () =>
		addFilter.mock.calls.some( ( [ hook ] ) => 'editor.BlockEdit' === hook );

	it( 'keeps type-level rules unchanged and skips the BlockEdit filter', () => {
		registerBlockRestrictions( {
			innerBlockRestrictions: { 'core/media-text': { blockSet: 'minimal' } },
			blockSets,
		} );

		expect(
			getTypeFilter()( { allowedBlocks: [ 'core/image' ] }, 'core/media-text' )
				.allowedBlocks
		).toEqual( [ 'core/image', 'core/paragraph', 'core/heading' ] );
		expect( hasBlockEditFilter() ).toBe( false );
	} );

	it( 'does not restrict a block type that only has conditions', () => {
		registerBlockRestrictions( {
			innerBlockRestrictions: { 'core/group': rule },
			blockSets,
		} );

		const settings = { title: 'Group' };

		expect( getTypeFilter()( settings, 'core/group' ) ).toBe( settings );
		expect( hasBlockEditFilter() ).toBe( true );
	} );
} );
