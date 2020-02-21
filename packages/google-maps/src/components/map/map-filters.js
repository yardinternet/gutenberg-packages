import CategoryControl from '../../inspector/categories-control';

function MapFilters( {
	style = {},
	filters = [],
	selectedFilters = [],
	onChange = () => {},
} ) {
	const isCategoryChecked = ( name ) => {
		return selectedFilters.includes( name );
	};

	const onChangeCheckbox = ( e ) => {
		const { name, checked } = e.target;

		onChange(
			checked
				? selectedFilters.concat( [ name ] )
				: selectedFilters.filter( ( item ) => item !== name )
		);
	};

	return (
		<div style={ style }>
			<CategoryControl filters={ filters } />
			<h1>Filter</h1>
			{ filters.map( ( item, key ) => {
				return (
					<>
						<div>
							<input
								id={ `checkbox-${ item }` }
								key={ key }
								type="checkbox"
								name={ item }
								checked={ isCategoryChecked( item ) }
								onChange={ onChangeCheckbox }
							/>
							<label htmlFor={ `checkbox-${ item }` }>
								{ item }
							</label>
						</div>
					</>
				);
			} ) }
		</div>
	);
}

export default MapFilters;
