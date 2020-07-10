/**
 * External dependencies
 */
import React from 'react';
/**
 * Internal dependencies
 */
import Greeting from './components/greeting';

import { useDataAttributes } from '../../hooks';
import { domID } from './config';

function GreetingWrapper() {
	const dataAttributes = useDataAttributes( domID );

	const obj = {
		labelMorning: dataAttributes.labelmorning,
		labelDay: dataAttributes.labelday,
		labelNight: dataAttributes.labelnight,
	};

	return <Greeting attributes={ obj } />;
}

export { domID, GreetingWrapper as Component };
