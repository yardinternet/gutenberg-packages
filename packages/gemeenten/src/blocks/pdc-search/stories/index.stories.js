import React from 'react';
import BasicForm from '../components/basic-form';
import { text, boolean } from '@storybook/addon-knobs';

import { attributes } from '../block.json';

import '@fortawesome/fontawesome-pro/css/all.min.css';

export default { title: 'PDC search' };

export const withBasicForm = () => (
	<BasicForm
		hasBtnText={ boolean( 'Has BtnText', true ) }
		disabled={ boolean( 'Btn disabled', true ) }
		btnText={ text( 'Zoeken', 'zoeken' ) }
		label={ text( 'Label', attributes.label.default ) }
	/>
);
