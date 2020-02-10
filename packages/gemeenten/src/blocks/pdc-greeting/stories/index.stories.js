import React from 'react';
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
