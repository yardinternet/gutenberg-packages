/**
 * Internal dependencies
 */
import {
	filterPostTypes,
	filterTaxonomies,
	mapPostTypes,
	mapPosts,
	mapAnyPosts,
	mapEvents,
	mapCustomViewsToKeyPair,
	populateTaxonomyValues,
	filterRemovedTerms,
	getValueLabelObjectByValue,
	templateValidateYardPropsSupport,
	hasSupportsNumberPerRow,
	hasPostypeTaxonomy,
	parseToAttributes,
} from '../utils';

describe( 'filterPostType', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( filterPostTypes() ).toEqual( [] );
	} );

	test( 'should return an array with filtered posttypes and exclude the excluded ones', () => {
		const myCpt = {
			name: 'My cpt',
			slug: 'my-cpt',
		};

		const page = {
			name: 'Pages',
			slug: 'pages',
		};

		const postTypes = {
			page,
			post: {
				name: 'Post',
				slug: 'post',
			},
			'my-cpt': myCpt,
		};

		const expected = [ page, myCpt ];

		expect( filterPostTypes( postTypes ) ).toEqual( expected );
	} );
} );

describe( 'filterTaxonomies', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( filterTaxonomies() ).toEqual( [] );
	} );

	test( 'should return an array with filtered taxonomies and exclude the excluded ones', () => {
		const taxonomies = {
			post_tag: {
				name: 'tags',
				slug: 'post_tag',
			},
			category: {
				name: 'category',
				slug: 'category',
			},
			tribe_events_cat: {
				name: 'tetribeeest',
				slug: 'test',
			},
		};

		const expected = [];

		expect( filterTaxonomies( taxonomies ) ).toEqual( expected );
	} );
} );

describe( 'mapPostTypes', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( mapPostTypes() ).toEqual( [] );
	} );

	test( 'should return an array of posttypes with key/pair values', () => {
		const postTypes = [
			{
				description: '',
				hierarchical: true,
				name: 'Pagina&#39;s',
				rest_base: 'pages',
				slug: 'page',
			},
		];

		const expected = [ { label: "Pagina's", value: 'page' } ];

		expect( mapPostTypes( postTypes ) ).toEqual( expected );
	} );
} );

describe( 'mapPosts', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( mapPosts() ).toEqual( [] );
	} );

	test( 'should return an array of posts with key/pair values', () => {
		const posts = [
			{
				id: 12,
				title: {
					rendered: 'Title',
				},
			},
		];

		const expected = [
			{
				label: 'Title',
				value: 12,
			},
		];

		expect( mapPosts( posts ) ).toEqual( expected );
	} );
} );

describe( 'mapAnyPosts', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( mapAnyPosts() ).toEqual( [] );
	} );

	test( 'should return an array of posts with key/pair values', () => {
		const posts = [
			{
				id: 12,
				title: 'Title',
			},
		];

		const expected = [
			{
				label: 'Title',
				value: 12,
			},
		];

		expect( mapAnyPosts( posts ) ).toEqual( expected );
	} );
} );

describe( 'mapEvents', () => {
	test( 'should return an empty array when calling without param', () => {
		expect( mapEvents() ).toEqual( [] );
	} );

	test( 'should return an array with key pair values', () => {
		const eventsObj = {
			events: [ { title: 'My events', id: 33 } ],
		};

		const expected = [ { label: 'My events', value: 33 } ];

		expect( mapEvents( eventsObj ) ).toEqual( expected );
	} );
} );

describe( 'mapCustomViewsToKeyPairValue', () => {
	test( 'should return empty []', () => {
		expect( mapCustomViewsToKeyPair() ).toEqual( [] );
	} );

	test( 'should return key pair array with label to first uppercase', () => {
		const customViews = { example: {}, awesome: {} };

		const expected = [
			{ label: 'Example', value: 'example' },
			{ label: 'Awesome', value: 'awesome' },
		];

		expect( mapCustomViewsToKeyPair( customViews ) ).toEqual( expected );
	} );
} );

describe( 'populateTaxonomyValues', () => {
	test( 'should return empty []', () => {
		expect( populateTaxonomyValues() ).toEqual( [] );
	} );

	test( 'should return key pair array without the `uitgelicht` taxonomy', () => {
		const selectedTerms = [ 'ontwikkeling' ];
		const taxonomies = [
			{ name: 'Ontwikkeling', slug: 'ontwikkeling' },
			{ name: 'Uitgelicht', slug: 'uitgelicht' },
		];

		const expected = [ { label: 'Ontwikkeling', value: 'ontwikkeling' } ];

		expect( populateTaxonomyValues( taxonomies, selectedTerms ) ).toEqual(
			expected
		);
	} );
} );

describe( 'filterRemovedTerms', () => {
	const validTerms = [
		{
			slug: 'category',
			data: [
				{
					slug: 'cate-gory-1',
				},
				{
					slug: 'category-2',
				},
			],
		},
		{
			slug: 'valid',
			data: [
				{
					slug: 'valid',
				},
			],
		},
		{
			slug: 'empty',
			data: [],
		},
		{
			slug: 'invalid',
			data: [ 'weee', 'waaa' ],
		},
	];

	const selectedTerms = {
		category: [ 'cate-gory-1', 'category-2', 'filter-out' ],
		valid: [ 'valid' ],
		test: [],
		customTaxo: [
			'myTerm',
			'anotherTerm',
			'Term is removed from database',
			'Another term is removed',
		],
	};

	const expected = {
		category: [ 'cate-gory-1', 'category-2' ],
		valid: [ 'valid' ],
	};

	test( 'should filter out removed terms', () => {
		expect( filterRemovedTerms( validTerms, selectedTerms ) ).toEqual(
			expected
		);
	} );

	test( 'should return empty array', () => {
		expect( filterRemovedTerms() ).toEqual( {} );
	} );
} );

describe( 'getValueLabelObjectByValue', () => {
	const posts = [ { value: 243, label: 'Hello' } ];

	test( 'should return value and label object', () => {
		const expected = { label: 'Hello', value: 243 };
		expect( getValueLabelObjectByValue( posts, 243 ) ).toEqual( expected );
	} );
} );

describe( 'templateSupportsNumberPerRow', () => {
	const customView = 'producten-diensten';

	const customViews = {
		faq: {
			props: [],
		},
		'producten-diensten': {
			props: [
				{
					name: 'HAS_NUMBER_PER_ROW',
					value: true,
				},
			],
		},
	};

	test( 'should return array', () => {
		const expected = [
			{
				name: 'HAS_NUMBER_PER_ROW',
				value: true,
			},
		];

		expect(
			templateValidateYardPropsSupport(
				customViews,
				customView,
				'HAS_NUMBER_PER_ROW'
			)
		).toEqual( expected );
	} );
} );

describe( 'hasSupportsNumberPerRow', () => {
	const numberPerRow = 1;
	const numberPerRowSm = 2;
	const numberPerRowXs = 3;

	test( 'should return true, all values are set', () => {
		expect(
			hasSupportsNumberPerRow( {
				numberPerRow,
				numberPerRowSm,
				numberPerRowXs,
			} )
		).toEqual( true );
	} );

	test( 'should return true, only numberPerRowXs isset', () => {
		expect( hasSupportsNumberPerRow( { numberPerRowXs } ) ).toEqual( true );
	} );

	test( 'should false', () => {
		expect( hasSupportsNumberPerRow( {} ) ).toEqual( false );
	} );
} );

describe( 'hasPostTypeTaxonomy', () => {
	const taxonomies = [
		{
			types: [ 'organisations', 'custom-taxo' ],
			slug: 'organisation',
		},
		{
			types: [],
		},
	];

	const currentTaxonomy = {
		slug: 'organisation',
	};

	test( 'should return false', () => {
		expect( hasPostypeTaxonomy() ).toEqual( false );
	} );

	test( 'posttype `organisations` has taxonomy, should return true', () => {
		expect(
			hasPostypeTaxonomy( taxonomies, currentTaxonomy, 'organisations' )
		).toEqual( true );
	} );

	test( 'posttype `any ` has taxonomies, should return true', () => {
		expect(
			hasPostypeTaxonomy( taxonomies, currentTaxonomy, 'any' )
		).toEqual( true );
	} );

	test( 'posttype `faq` has no taxonomies, should return false', () => {
		expect(
			hasPostypeTaxonomy( taxonomies, currentTaxonomy, 'faq' )
		).toEqual( false );
	} );
} );

describe( 'parseAttributes', () => {
	const expected = [
		{
			baseUrl: 'https://www.valente.nl/wp-json/wp/v2/',
			slugs: [ 'pages', 'faq' ],
			taxonomies: [
				{ source: 'pages', taxonomies: undefined },
				{ source: 'faq', taxonomies: undefined },
			],
		},
	];

	const options = [
		{
			value: '{"baseUrl":"https://www.valente.nl/wp-json/wp/v2/","title":"Valente","type":"Paginas","slug":"pages"}',
			label: 'Valente: Paginas',
		},
		{
			value: '{"baseUrl":"https://www.valente.nl/wp-json/wp/v2/","title":"Valente","type":"Faq","slug":"faq"}',
			label: 'Valente: Faq',
		},
	];

	console.log( parseToAttributes( options ) );

	test( 'parseAttributes with values', () => {
		expect( parseToAttributes( options ) ).toEqual( expected );
	} );

	test( 'parseAttributes should return empty array when react-select returns a null value', () => {
		expect( parseToAttributes( null ) ).toEqual( [] );
	} );
} );
