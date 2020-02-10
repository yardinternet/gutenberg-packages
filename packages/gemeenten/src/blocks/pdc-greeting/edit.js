/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Greeting from './components/greeting';

function edit( props ) {
	return (
		<>
			<Inspector { ...props } />
			<Greeting { ...props } />
		</>
	);
}

export default edit;
