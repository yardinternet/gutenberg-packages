/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Greetings from './components/greetings';

function edit( props ) {
	return (
		<>
			<Inspector { ...props } />
			<Greetings { ...props } />
		</>
	);
}

export default edit;
