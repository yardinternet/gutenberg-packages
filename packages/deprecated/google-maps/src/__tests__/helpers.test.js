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
			markerImage: { url: 'https://www.marker.com/marker.png' },
		},
	];

	const result = [
		{
			latLng: {
				lat: 52.3666969,
				lng: 4.8945398,
			},
			infowindow: undefined,
			infowindowEmail: undefined,
			infowindowPhone: undefined,
			infowindowTargetURL: undefined,
			infowindowTitle: undefined,
			infowindowURL: undefined,
			icon: '',
		},
		{
			latLng: {
				lat: 52.03434,
				lng: 5.16567,
			},
			infowindow: undefined,
			infowindowEmail: undefined,
			infowindowPhone: undefined,
			infowindowTargetURL: undefined,
			infowindowTitle: undefined,
			infowindowURL: undefined,
			icon: 'https://www.marker.com/marker.png',
		},
	];

	test( 'extract markers from markergroups', () => {
		expect( parseMarkerGroupMarkers( markerGroups ) ).toEqual( result );
	} );

	test( 'extract markers from markergroups with empty []', () => {
		expect( parseMarkerGroupMarkers( [] ) ).toEqual( [] );
	} );
} );
