/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
/**
 * External dependencies
 */
import Select from 'react-select';
/**
 * Internal dependencies
 */
import StickyPost from './stickypost';
import { applyFilters } from '@wordpress/hooks';

import {
	Spinner,
	QueryControls,
	CheckboxControl,
	PanelBody,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { getOpenPubItems } from './../../../api';

export default ( props ) => {
	const { attributes, setAttributes, posts } = props;
	const {
		stickyPostSelection,
		selectedStickyPostID,
		selectedTypeTerms,
		selectedAudienceTerms,
		postsToShow,
		displayDate,
		displayExcerpt,
		displayFeaturedImage,
		selectedView,
	} = attributes;

	const [ terms, setTerms ] = useState( [] );

	useEffect( () => {
		getTaxonomyTerms( 'type', 'openpub-type?per_page=100' );
		getTaxonomyTerms( 'audience', 'openpub-audience?per_page=100' );
	}, [] );

	const getTaxonomyTerms = async ( taxonomy, query ) => {
		const data = await getOpenPubItems(
			query,
			`${ theme.openpubEndpoint }/wp-json/wp/v2/`
		);

		if ( data ) {
			setTerms( ( prevSate ) => {
				return {
					...prevSate,
					[ taxonomy ]: data,
				};
			} );
		}
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<Fragment>
					<QueryControls
						{ ...{ postsToShow } }
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ ( value ) =>
							setAttributes( {
								postsToShow: value,
							} )
						}
					/>
				</Fragment>
			</PanelBody>

			<PanelBody title={ __( 'Weergave' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Toon datum' ) }
					checked={ displayDate }
					onChange={ () =>
						setAttributes( { displayDate: ! displayDate } )
					}
				/>
				<ToggleControl
					label={ __( 'Toon samenvatting' ) }
					checked={ displayExcerpt }
					onChange={ () =>
						setAttributes( { displayExcerpt: ! displayExcerpt } )
					}
				/>
				<ToggleControl
					label={ __( 'Toon uitgelichte afbeelding' ) }
					checked={ displayFeaturedImage }
					onChange={ () =>
						setAttributes( {
							displayFeaturedImage: ! displayFeaturedImage,
						} )
					}
				/>
			</PanelBody>

			{ !! posts.length && (
				<PanelBody
					title={ __( 'Klevend bericht' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						label={ __( 'Klevend bericht' ) }
						checked={ stickyPostSelection }
						onChange={ ( checked ) =>
							setAttributes( {
								stickyPostSelection: checked,
								selectedStickyPostID: 0,
							} )
						}
					/>

					{ stickyPostSelection && !! posts.length && (
						<StickyPost
							setAttributes={ setAttributes }
							selectedStickyPostID={ selectedStickyPostID }
						/>
					) }

					{ stickyPostSelection && posts.length === 0 && (
						<Fragment>
							<Spinner />
							<span>{ __( 'Data ophalen...' ) }</span>
						</Fragment>
					) }
				</PanelBody>
			) }

			<PanelBody title={ __( 'Type' ) } initialOpen={ false }>
				{ terms.type && !! terms.type.length && (
					<Select
						value={ selectedTypeTerms }
						label={ __( 'Selecteer type' ) }
						isMulti={ true }
						onChange={ ( value ) => {
							setAttributes( { selectedTypeTerms: value } );
						} }
						options={ terms.type.map( ( term ) => ( {
							value: term.slug,
							label: term.name,
						} ) ) }
					/>
				) }
			</PanelBody>

			<PanelBody title={ __( 'Doelgroep' ) } initialOpen={ false }>
				{ terms.audience && !! terms.audience.length && (
					<Select
						value={ selectedAudienceTerms }
						label={ __( 'Selecteer doelgroep' ) }
						isMulti={ true }
						onChange={ ( value ) => {
							setAttributes( { selectedAudienceTerms: value } );
						} }
						options={ terms.audience.map( ( term ) => ( {
							value: term.slug,
							label: term.name,
						} ) ) }
					/>
				) }
			</PanelBody>

			<PanelBody title={ __( 'Sjabloon' ) } initialOpen={ false }>
				<SelectControl
					value={ selectedView }
					label={ __( 'Selecteer sjabloon' ) }
					onChange={ ( value ) => {
						setAttributes( { selectedView: value } );
					} }
					options={ applyFilters(
						'gutenberg-gemeenten.OpenPubListPostTemplates',
						[ { value: 'index', label: __( 'Standaard' ) } ]
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
