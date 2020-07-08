import React from 'react';

function Greeting( props ) {
	const { attributes, date = new Date() } = props;
	const { labelMorning, labelDay, labelNight } = attributes;

	const getLabel = ( hour ) => {
		if ( hour > 0 && hour < 12 ) {
			return labelMorning;
		} else if ( hour >= 12 && hour < 18 ) {
			return labelDay;
		}
		return labelNight;
	};

	const label = getLabel( date.getHours() );

	return (
		<div className="gemeenten-block gemeenten-block--pdc-greeting">
			{ label }
		</div>
	);
}

export default Greeting;
