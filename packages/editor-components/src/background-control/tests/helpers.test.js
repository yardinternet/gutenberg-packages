import { populateSelectFromMediaSizes, getImageSizeByUrl } from '../helpers';

const sizes = {
	thumbnail: {
		file: 'event-150x150.jpeg',
		width: 150,
		height: 150,
		mime_type: 'image/jpeg',
		source_url:
			'http://whitelabel.local/wp-content/uploads/2019/05/event-150x150.jpeg',
	},
	medium: {
		file: 'event-300x214.jpeg',
		width: 300,
		height: 214,
		mime_type: 'image/jpeg',
		source_url:
			'http://whitelabel.local/wp-content/uploads/2019/05/event-300x214.jpeg',
	},
};

describe( 'backgroundControl', () => {
	const slugLabels = [
		{
			slug: 'thumbnail',
			name: 'Thumbnail',
		},
		{
			slug: 'medium',
			name: 'Gemiddeld',
		},
		{
			slug: 'large',
			name: 'Groot',
		},
		{
			slug: 'full',
			name: 'Volledige grootte',
		},
	];

	const expected = [
		{
			label: 'Thumbnail',
			value:
				'http://whitelabel.local/wp-content/uploads/2019/05/event-150x150.jpeg',
		},
		{
			label: 'Gemiddeld',
			value:
				'http://whitelabel.local/wp-content/uploads/2019/05/event-300x214.jpeg',
		},
	];

	test( 'populate selectControl from getMedia', () => {
		expect( populateSelectFromMediaSizes( sizes, slugLabels ) ).toEqual(
			expected
		);
	} );

	test( 'getImageSizeByUrl', () => {
		expect(
			getImageSizeByUrl(
				'http://whitelabel.local/wp-content/uploads/2019/05/event-150x150.jpeg',
				sizes
			)
		).toBe( expected[ 0 ].value );
	} );
} );
