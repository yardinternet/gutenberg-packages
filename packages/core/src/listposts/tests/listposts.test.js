import React from 'react'; // eslint-disable-line
/**
 * Internal dependencies
 */
import { attributes, name } from '../block.json';
import {
	filterStickyPostSelectOptions,
	filterExcludedPostsSelectOptions,
} from '../utils';

describe( 'basic tests', () => {
	test( 'block name should not change', () => {
		expect( name ).toMatchSnapshot();
	} );

	test( 'attributes should not change', () => {
		expect( attributes ).toMatchSnapshot();
	} );
} );

describe( 'utils', () => {
	const excludesPosts = [ { value: 1, label: 'postOne' } ];

	const posts = [
		{ value: 1, label: 'postOne' },
		{ value: 2, label: 'postTwo' },
		{ value: 3, label: 'postThree' },
	];

	const expectedStickyPostsSelectOptions = [
		{ value: 2, label: 'postTwo' },
		{ value: 3, label: 'postThree' },
	];

	const expectedExcludedPostsSelectOptions = [
		{ value: 1, label: 'postOne' },
		{ value: 3, label: 'postThree' },
	];

	const stickyPostSelection = true;

	const selectedStickyPostID = 2;

	test( 'should return excluded values in sticky post select options', () => {
		expect( filterStickyPostSelectOptions( excludesPosts, posts ) ).toEqual(
			expectedStickyPostsSelectOptions
		);
	} );

	test( 'should return excluded values in excludes posts select options', () => {
		expect(
			filterExcludedPostsSelectOptions(
				stickyPostSelection,
				selectedStickyPostID,
				posts
			)
		).toEqual( expectedExcludedPostsSelectOptions );
	} );

	test( 'should return original posts array', () => {
		expect(
			filterExcludedPostsSelectOptions(
				false,
				selectedStickyPostID,
				posts
			)
		).toEqual( posts );
	} );
} );
