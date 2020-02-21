import { CheckboxControl } from '@wordpress/components';

function CategoriesControl( {
	categories = [],
	categoriesSelected = [],
	onChange = () => {},
} ) {
	const isCategoryChecked = ( name ) => {
		return categoriesSelected.includes( name );
	};

	return categories.map( ( { name }, index ) => {
		return (
			<CheckboxControl
				key={ index }
				label={ name }
				checked={ isCategoryChecked( name ) }
				onChange={ ( bool ) => onChange( { name, bool } ) }
			/>
		);
	} );
}

export default CategoriesControl;
