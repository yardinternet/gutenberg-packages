/**
 * Internal dependencies
 */
import Greetings from './components/greetings';

import { useDataAttributes } from '../../hooks';
import { domID } from './config';

function GreetingsWrapper() {
	const dataAttributes = useDataAttributes( domID );

	const attr = {
		greetings: JSON.parse(dataAttributes.greetings),
	};

	return <Greetings attributes={ attr } />;
}

export { domID, GreetingsWrapper as Component };
