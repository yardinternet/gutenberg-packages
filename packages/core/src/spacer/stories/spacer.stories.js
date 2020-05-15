/**
 * External dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Edit from '../components/edit';
import Save from '../components/save';

export default {
	component: Edit,
	title: 'Spacer',
};

export const EditView = () => {
	const [ size, setSize ] = useState( 0 );

	return <Edit size={ size } setSize={ setSize } />;
};

export const FrontendView = () => <Save />;
