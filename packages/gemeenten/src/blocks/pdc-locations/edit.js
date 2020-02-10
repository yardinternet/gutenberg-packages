/**
 * Internal dependencies
 */
import Locations from './components/locations';
import locations from './fixtures/locations';

function edit() {
	return (
		<>
			<Locations locations={ locations } />
		</>
	);
}

export default edit;
