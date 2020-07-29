export const options = [
	{
		value:
			'{"baseUrl":"https://www.valente.nl/wp-json/wp/v2/","title":"Valente","type":"Paginas","slug":"pages"}',
		label: 'Valente: Paginas',
	},
];

export const sources = [
	{
		title: 'Valente',
		value: 'site-1',
		id: 'site-1',
		baseUrl: 'https://www.valente.nl/wp-json/wp/v2/',
		types: [
			{ id: 'pages', name: 'Paginas', slug: 'pages' },
			{ id: 'faq', name: 'Faq', slug: 'yard-faq' },
		],
	},
	{
		title: 'Yard',
		value: 'site-2',
		id: 'site-2',
		baseUrl: 'https://www.yard.nl/wp-json/wp/v2/',
		types: [ { id: 'pages', name: 'Paginas', slug: 'pages' } ],
	},
	{
		title: 'CPZ',
		value: 'site-3',
		id: 'site-3',
		baseUrl: 'http://projectcpzportal.local/wp-json/wp/v2/',
		types: [ { id: 'pages', name: 'Paginas', slug: 'pages' } ],
	},
	{
		title: 'Fake',
		value: 'site-4',
		id: 'site-3',
		baseUrl: 'http://fake.local/wp-json/wp/v2/',
		types: [ { id: 'fake', name: 'Fake posts', slug: 'fake' } ],
	},
];
