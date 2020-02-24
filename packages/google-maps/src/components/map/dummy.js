export const mapOptions = {
	zoom: 8,
	center: { lat: 52.370216, lng: 4.895168 },
	disableDefaultUI: false,
	markerClusterer: true,
};

export const markers1 = [
	{
		name: 'Amsterdam',
		latLng: {
			lat: 52.3666969,
			lng: 4.8945398,
		},
	},
	{
		name: 'Houten',
		latLng: {
			lat: 52.03434,
			lng: 5.16567,
		},
	},
	{
		name: 'Houten 2',
		latLng: {
			lat: 52.01333,
			lng: 5.18745,
		},
	},
];

export const markers2 = [
	{
		name: 'Arnhem',
		latLng: {
			lat: 51.9851,
			lng: 5.8987,
		},
	},
];

export const markerGroup1 = [
	{
		name: 'Noord Holland',
		markers: markers1,
		categories: [ 'filter1', 'filter2' ],
	},
];

export const markerGroup2 = [
	{ name: 'Utrecht', markers: markers2, categories: [ 'filter3' ] },
];
