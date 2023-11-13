/**
 * External dependencies
 */
import React from 'react'; // eslint-disable-line
/**
 * Internal dependencies
 */
import Greeting from '../components/greeting';

export default { title: 'PDC greeting' };

const props = {
	attributes: {
		labelMorning: 'Goedemorgen',
		labelDay: 'Goedemiddag',
		labelNight: 'Goedenavond',
	},
};

export const SampleGreeting = () => <Greeting { ...props } />;
