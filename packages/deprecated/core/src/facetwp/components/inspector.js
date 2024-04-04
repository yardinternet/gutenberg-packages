/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import FacetSelects from './facet-selects';

const Inspector = ( props ) => {
	const { facets, templates, templateOnChange } = props;

	return (
		<InspectorControls>
			<FacetSelects
				{ ...{ templateOnChange, facets, templates, ...props } }
			/>
		</InspectorControls>
	);
};

export default Inspector;
