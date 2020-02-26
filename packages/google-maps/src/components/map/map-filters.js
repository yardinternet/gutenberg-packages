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
		<div className="yard-google-map-advanced__filters" style={ style }>
			<h2 className="yard-google-map-advanced__title">{ title }</h2>
			<div className="yard-google-map-advanced__content">{ content }</div>
			{ filters.map( ( name, key ) => {
				return [
					<div
						className="yard-google-map-advanced__option"
						key={ key }
					>
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
