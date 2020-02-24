import Map from '../../map';
import { markerGroup1, markerGroup2 } from './dummy';

import '@wordpress/components/build-style/style.css';

export default {
	title: 'GoogleMaps/Components',
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
		<Map
			categories={ [
				{ name: 'filter1', filter: 'true' },
				{ name: 'filter2', filter: 'true' },
				{ name: 'filter3', filter: 'false' },
			] }
			filterOptions={ filterOptions }
			markerGroups={ markerGroup1.concat( markerGroup2 ) }
		/>
	);
};
