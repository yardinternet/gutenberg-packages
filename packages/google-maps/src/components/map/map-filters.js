import React from 'react';

function MapFilters( {
	style = { width: '30%' },
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
			<fieldset>
				<legend>
					<h2 className="yard-google-map-advanced__title">
						{ title }
					</h2>
				</legend>
				<div className="yard-google-map-advanced__content">
					{ content }
				</div>
				<div className="yard-google-map-advanced__checkboxes">
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
								<label htmlFor={ `checkbox-${ name }` }>
									{ name }
								</label>
							</div>,
						];
					} ) }
				</div>
			</fieldset>
		</div>
	);
}

export default MapFilters;
