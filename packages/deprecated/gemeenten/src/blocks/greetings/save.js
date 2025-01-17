/**
 * Internal dependencies
 */
import { domID } from './config';

function save( props ) {
	return (
		<div
			data-greetings={ JSON.stringify( props.attributes.greetings ) }
			id={ domID }
		></div>
	);
}

export default save;
