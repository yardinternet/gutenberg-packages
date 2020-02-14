/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Map from './map';

function edit( props ) {
	return (
		<>
			<Inspector { ...props } />
			<Map { ...props } />
			<p>Edit</p>
		</>
	);
}

export default edit;
