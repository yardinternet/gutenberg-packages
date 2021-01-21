/**
 * External dependencies
 */
import * as Sentry from '@sentry/browser';
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ServerSideRender, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FacetSelects from './components/facet-selects';
import Inspector from './components/inspector';

class Edit extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			facets: [],
			templates: [],
		};
	}

	componentDidMount() {
		this.fetchFacet( 'templates' );
		this.fetchFacet( 'facets' );
	}

	/**
	 * Fetch the facetWP options
	 *
	 * @param {string} type template|facets
	 */
	fetchFacet( type ) {
		apiFetch( {
			path: `/yard/blocks/v1/facetwp/${ type }`,
		} )
			.then( ( result ) => {
				this.setState( {
					[ type ]: result,
				} );
			} )
			.catch( ( error ) => {
				Sentry.captureMessage( error );
			} );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { selectedFacets, selectedTemplate } = attributes;
		const { facets, templates } = this.state;

		/**
		 * Set selectedTemplate val returned from react-select
		 * This func is passed down to child components
		 *
		 * @param {Object} val { name: 'hi', value: 'hi' }
		 */
		const templateOnChange = ( val ) => {
			setAttributes( {
				selectedTemplate: val,
			} );
		};

		return (
			<Fragment>
				<Inspector
					{ ...{
						templateOnChange,
						facets,
						templates,
						...this.props,
					} }
				/>
				{ selectedFacets.length === 0 ||
				Object.keys( selectedTemplate ).length === 0 ? (
					<Placeholder
						icon={
							<BlockIcon
								faClasses="fal fa-gem"
								marginRight={ true }
							/>
						}
						label={ __( 'Filtering' ) }
					>
						<FacetSelects
							{ ...{
								templateOnChange,
								facets,
								templates,
								...this.props,
							} }
						/>
					</Placeholder>
				) : (
					<ServerSideRender
						block="yard-blocks/facet-wp"
						attributes={ attributes }
					/>
				) }
			</Fragment>
		);
	}
}

export default Edit;
