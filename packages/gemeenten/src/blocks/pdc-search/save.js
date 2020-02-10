import { domID } from './config';

function save( props ) {
	return (
		<div
			data-searchurl={ props.attributes.searchUrl }
			data-label={ props.attributes.label }
			id={ domID }
		></div>
	);
}

export default save;
