import { useState } from '@wordpress/element';
import CategoriesControl from '../../categories-control';

export default {
	title: 'GoogleMaps/Inspector',
};

const defaultCategories = [
	{ name: 'Category X' },
	{ name: 'Category Y' },
	{ name: 'Category Z' },
];

export const CategoriesControlC = () => {
	const [ selectedCategories, setSelectedCategories ] = useState( [] );

	const onChange = ( data ) => {
		setSelectedCategories( data );
	};

	return (
		<CategoriesControl
			categories={ defaultCategories }
			categoriesSelected={ selectedCategories }
			onChange={ onChange }
		/>
	);
};
