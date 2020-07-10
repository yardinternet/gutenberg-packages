/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

function CategoriesControl( {
	categories = [],
	categoriesSelected = [],
	onChange = () => {},
} ) {
	const isCategoryChecked = ( name ) => {
		return categoriesSelected.includes( name );
	};

	const onChangeCheckbox = ( data ) => {
		onChange(
			data.bool
				? categoriesSelected.concat( data.name )
				: categoriesSelected.filter( ( item ) => item !== data.name )
		);
	};

	return categories.map( ( { name }, index ) => {
		return (
			<CheckboxControl
				key={ index }
				label={ name }
				checked={ isCategoryChecked( name ) }
				onChange={ ( bool ) => onChangeCheckbox( { name, bool } ) }
			/>
		);
	} );
}

export default CategoriesControl;
