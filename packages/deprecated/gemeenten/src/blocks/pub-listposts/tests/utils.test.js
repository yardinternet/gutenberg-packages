import { findPost, createOptions } from '../components/stickypost';

describe( 'createOptions', () => {
	const posts = [
		{
			id: 15937,
			title: {
				rendered: 'Team Jeugd helpt!',
			},
		},
		{
			id: 15898,
			title: {
				rendered: 'Ondertekening verkoopovereenkomst',
			},
		},
	];

	test( 'Should return array of objects containing value and label attributes', () => {
		const expected = [
			{ value: 15937, label: 'Team Jeugd helpt!' },
			{ value: 15898, label: 'Ondertekening verkoopovereenkomst' },
		];
		expect( createOptions( posts ) ).toEqual( expected );
	} );
} );

describe( 'findPost', () => {
	const posts = [ { id: 243, title: 'Hello' } ];

	test( 'Should return value and label object', () => {
		const expected = { value: 243, label: 'Hello' };
		expect( findPost( 243, posts ) ).toEqual( expected );
	} );

	test( 'Should not find posts and return false', () => {
		const expected = false;
		expect( findPost( 245, posts ) ).toEqual( expected );
	} );

	test( 'Should return false', () => {
		const expected = false;
		const emptyPosts = [];
		expect( findPost( 245, emptyPosts ) ).toEqual( expected );
	} );
} );
