/**
 * External dependencies
 */
import React from 'react'; // eslint-disable-line
/**
 * Internal dependencies
 */
import BasicForm from '../components/basic-form';
import { text, boolean } from '@storybook/addon-knobs';

import { attributes } from '../block.json';

export default { title: 'PDC search' };

export const withBasicForm = () => (
	<BasicForm
		hasBtnText={ boolean( 'Has BtnText', true ) }
		disabled={ boolean( 'Btn disabled', true ) }
		btnText={ text( 'Zoeken', 'zoeken' ) }
		label={ text( 'Label', attributes.label.default ) }
	/>
);
