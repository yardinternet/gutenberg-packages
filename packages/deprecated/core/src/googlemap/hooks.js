/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

export const MARKER_ICON = applyFilters(
	'yard-blocks.googleMapMarkerIcon',
	{}
);

export const MAP_OPTIONS = applyFilters( 'yard-blocks.googleMapOptions', {
	zoom: 8,
	center: { lat: 52.370216, lng: 4.895168 },
	disableDefaultUI: true,
} );
