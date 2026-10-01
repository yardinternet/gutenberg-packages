import { addFilter } from '@wordpress/hooks';
import { getConditionalAllowedBlocks, registerBlockRestrictions } from '../src';

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

	it( 'falls back to the rule next to `when`', () => {
		const withFallback = { ...rule, add: [ 'core/image' ] };

		expect(
			getConditionalAllowedBlocks(
				withFallback,
				{ classNames: [], postType: 'post' },
				blockSets,
				[ 'core/paragraph' ]
			)
		).toEqual( [ 'core/paragraph', 'core/image' ] );
		expect(
			getConditionalAllowedBlocks(
				rule,
				{ classNames: [], postType: 'post' },
				blockSets
			)
		).toBeUndefined();
	} );
} );

describe( 'registerBlockRestrictions', () => {
	beforeEach( () => addFilter.mockClear() );

	const getTypeFilter = () =>
		addFilter.mock.calls.find(
			( [ hook ] ) => 'blocks.registerBlockType' === hook
		)[ 2 ];

	const hasBlockEditFilter = () =>
		addFilter.mock.calls.some(
			( [ hook ] ) => 'editor.BlockEdit' === hook
		);

	it( 'keeps type-level rules unchanged and skips the BlockEdit filter', () => {
		registerBlockRestrictions( {
			innerBlockRestrictions: {
				'core/media-text': { blockSet: 'minimal' },
			},
			blockSets,
		} );

		expect(
			getTypeFilter()(
				{ allowedBlocks: [ 'core/image' ] },
				'core/media-text'
			).allowedBlocks
		).toEqual( [ 'core/image', 'core/paragraph', 'core/heading' ] );
		expect( hasBlockEditFilter() ).toBe( false );
	} );

	it( 'leaves block types with conditions to the instance filter', () => {
		registerBlockRestrictions( {
			innerBlockRestrictions: {
				'core/group': { ...rule, add: [ 'theme/card' ] },
			},
			blockSets,
		} );

		const settings = { title: 'Group', supports: { allowedBlocks: true } };

		expect( getTypeFilter()( settings, 'core/group' ) ).toBe( settings );
		expect( hasBlockEditFilter() ).toBe( true );
	} );

	it( 'warns when a block with conditions does not support allowedBlocks', () => {
		const warn = jest.spyOn( console, 'warn' ).mockImplementation();

		registerBlockRestrictions( {
			innerBlockRestrictions: { 'theme/card': rule, 'core/group': rule },
			blockSets,
		} );

		getTypeFilter()( {}, 'theme/card' );
		getTypeFilter()( { supports: { allowedBlocks: true } }, 'core/group' );

		expect( warn ).toHaveBeenCalledTimes( 1 );
		expect( warn.mock.calls[ 0 ][ 0 ] ).toContain( 'theme/card' );
		warn.mockRestore();
	} );
} );
