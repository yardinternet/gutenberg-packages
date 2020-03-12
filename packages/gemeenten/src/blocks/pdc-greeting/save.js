import { domID } from './config';

function save( props ) {
	return (
		<div
			data-labelmorning={ props.attributes.labelMorning }
			data-labelday={ props.attributes.labelDay }
			data-labelnight={ props.attributes.labelNight }
			id={ domID }
		></div>
	);
}

export default save;
