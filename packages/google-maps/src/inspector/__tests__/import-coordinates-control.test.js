import { parseLatLngFromCoords } from '../import-coordinates-control';

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
