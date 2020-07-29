/**
 * External dependencies
 */
import Select from 'react-select';

const { Fragment } = wp.element;
const { __ } = wp.i18n;

const FacetSelects = ( props ) => {
	const {
		setAttributes,
		attributes,
		facets,
		templates,
		templateOnChange,
	} = props;
	const { selectedFacets, selectedTemplate } = attributes;

	return (
		<Fragment>
			<p className="yard-label">{ __( 'Selecteer facet' ) }</p>
			<Select
				isMulti
				value={ selectedFacets }
				getOptionValue={ ( opt ) => opt.name }
				onChange={ ( val ) => setAttributes( { selectedFacets: val } ) }
				options={ facets }
			/>
			<p className="yard-label">{ __( 'Selecteer template' ) }</p>
			<Select
				value={ [ selectedTemplate ] }
				getOptionValue={ ( opt ) => opt.name }
				onChange={ templateOnChange }
				options={ templates }
			/>
		</Fragment>
	);
};

export default FacetSelects;
