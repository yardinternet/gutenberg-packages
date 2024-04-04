/**
 * External dependencies
 */
import { withA11y } from '@storybook/addon-a11y';
/**
 * Internal dependencies
 */
import Map from '../../map';
import { mapOptions, markerGroup1, markerGroup2, polygons } from './dummy';

/**
 * WordPress dependencies
 */
import '@wordpress/components/build-style/style.css';

export default {
	title: 'GoogleMaps/Components',
	decorators: [ withA11y ],
};

const filterOptions = {
	showFilters: true,
	title: 'Titel',
	content: 'Content',
};

export const GoogleMap = () => {
	return (
		<>
			<Map markerGroups={ markerGroup1 } />
		</>
	);
};

export const GoogleMapFilters = () => {
	return (
		<div>
			<Map
				categories={ [
					{ name: 'filter1', filter: 'true' },
					{ name: 'filter2', filter: 'true' },
					{ name: 'filter3', filter: 'false' },
				] }
				mapOptions={ mapOptions }
				filterOptions={ filterOptions }
				polygons={ polygons }
				markerGroups={ markerGroup1.concat( markerGroup2 ) }
			/>
		</div>
	);
};
