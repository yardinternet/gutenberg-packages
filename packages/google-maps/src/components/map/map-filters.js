import React from 'react';

function MapFilters( {
	style = {},
	filters = [],
	selectedFilters = [],
	filterOptions = {},
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

	const { title, content } = filterOptions;

	return (
		<div style={ style }>
			<h2>{ title }</h2>
			<div>{ content }</div>
			{ filters.map( ( name, key ) => {
				return [
					<div key={ key }>
						<input
							id={ `checkbox-${ name }` }
							key={ key }
							type="checkbox"
							name={ name }
							checked={ isCategoryChecked( name ) }
							onChange={ onChangeCheckbox }
						/>
						<label htmlFor={ `checkbox-${ name }` }>{ name }</label>
					</div>,
				];
			} ) }
		</div>
	);
}

export default MapFilters;
