import React from 'react';

import IconPickerControl from '../index';

import '../assets/css/fontawesome-all.min.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';

export default { title: 'IconPicker' };

export const IconPicker = () => (
	<IconPickerControl icon="fas fa-envelope" onChange={ () => {} } />
);
