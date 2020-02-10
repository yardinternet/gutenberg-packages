import { getSelectedPost, postOptions } from '../utils';

describe('getSelectedPost', () => {
	const posts = [{ value: 243, label: 'Hello' }];

	test('should return value and label object', () => {
		const expected = { label: 'Hello', value: 243 };
		expect(getSelectedPost(posts, 243)).toEqual(expected);
	});
});

describe('postOptions', () => {
	const posts = [
		{
			id: 15937,
			title: 'Team Jeugd helpt!',
		},
		{
			id: 15898,
			title: 'Ondertekening verkoopovereenkomst',
		},
	];

	test('Should return array of objects containing value and label attributes', () => {
		const expected = [
			{ value: 15937, label: 'Team Jeugd helpt!' },
			{ value: 15898, label: 'Ondertekening verkoopovereenkomst' },
		];
		expect(postOptions(posts)).toEqual(expected);
	});
});
