import { parseLatLngFromCoords } from '../import-coordinates-control';
import { populateSelectCPT } from '../../helpers.js';

const kmlOutput = '[[ 5.0305408, 52.4014953, 0 ],[ 5.0034657, 52.4062515,0]]';

describe( 'parseLatLngFromCoords', () => {
	test( 'should return []', () => {
		expect( parseLatLngFromCoords() ).toStrictEqual( new Error() );
	} );

	test( 'should parse coords to latLng object', () => {
		expect( parseLatLngFromCoords( kmlOutput ) ).toEqual(
			'[{"lat":52.4014953,"lng":5.0305408},{"lat":52.4062515,"lng":5.0034657}]'
		);
	} );
} );

const posts = [
	{
		title: {
			rendered: 'test1',
		},
	},
	{
		title: {
			rendered: 'test2',
		},
	},
];

const markers = [
	{
		name: 'test1',
	},
];

const expectedResult = [
	{
		value: 'test2',
		label: 'test2',
	},
];

describe( 'populate the react select', () => {
	test( 'should return []', () => {
		expect( populateSelectCPT( posts, markers ) ).toEqual( expectedResult );
	} );
} );
