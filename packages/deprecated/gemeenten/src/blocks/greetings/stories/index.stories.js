/**
 * External dependencies
 */
import React from 'react'; // eslint-disable-line
/**
 * Internal dependencies
 */
import Greetings from '../components/greetings';

export default { title: 'Greetings' };

const props = {
	attributes: {
		greetings: {
			'06:00-08:59': 'Goedeochtend',
			'09:00-11:59': 'Goedemorgen',
			'12:00-17:59': 'Goedemiddag',
			'18:00-23:59': 'Goedenavond',
			'00:00-05:59': 'Goedenacht',
		},
	},
};

export const SampleGreeting = () => <Greetings { ...props } />;
