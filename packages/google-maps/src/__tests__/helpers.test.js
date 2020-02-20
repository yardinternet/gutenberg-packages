import { parseMarkerGroupMarkers } from '../helpers';

describe( 'parseMarkerGroupMarkers', () => {
	const markerGroups = [
		{
			name: 'Noord Holland',
			markers: [
				{
					name: 'Amsterdam',
					latLng: {
						lat: 52.3666969,
						lng: 4.8945398,
					},
				},
			],
			markerImage: {},
		},
		{
			name: 'Utrecht',
			markers: [
				{
					name: 'Houten',
					latLng: {
						lat: 52.03434,
						lng: 5.16567,
					},
				},
			],
			markerImage: { url: 'blaat' },
		},
	];

	const result = [
		{
			latLng: {
				lat: 52.3666969,
				lng: 4.8945398,
			},
		},
		{
			latLng: {
				lat: 52.03434,
				lng: 5.16567,
			},
			icon: 'blaat',
		},
	];

	test( 'extract markers from markergroups', () => {
		expect( parseMarkerGroupMarkers( markerGroups ) ).toEqual( result );
	} );

	test( 'extract markers from markergroups with empty []', () => {
		expect( parseMarkerGroupMarkers( [] ) ).toEqual( [] );
	} );
} );
