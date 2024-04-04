function getGoogleMapBlockSettings( googleMapBlockSettings ) {
	const settings = {
		...{ settings: { google_map_api_key: '' } },
		...googleMapBlockSettings,
	};

	return settings;
}

export { getGoogleMapBlockSettings };
