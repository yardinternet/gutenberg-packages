/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CollapseItem from '../collapse-item/components/collapse-item';
import './../editor.scss';
import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'; // eslint-disable-line
import 'https://code.jquery.com/jquery-3.3.1.slim.min.js'; // eslint-disable-line
import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'; // eslint-disable-line

export default {
	component: CollapseItem,
	title: 'Collapse item',
};

export const EditView = () => {
	const [ headerText, setHeaderText ] = useState( '' );

	return (
		<CollapseItem headerText={ headerText } setHeaderText={ setHeaderText }>
			Hallo
		</CollapseItem>
	);
};
