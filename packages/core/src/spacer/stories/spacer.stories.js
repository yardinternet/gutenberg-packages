import { action } from '@storybook/addon-actions';

import Edit from '../components/edit';
import Save from '../components/save';

export default {
	component: Edit,
	title: 'Spacer',
};

export const edit = () => <Edit onChange={ action( 'onChange' ) } />;

export const frontend = () => <Save />;
