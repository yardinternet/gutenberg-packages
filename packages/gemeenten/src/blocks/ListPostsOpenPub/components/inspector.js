import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import Select from 'react-select';
import { getSelectedPost, postOptions } from '../utils';
import {
	Spinner,
	QueryControls,
	CheckboxControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { fetchOpenpub } from './api';

export default (props) => {
	const { attributes, setAttributes, posts } = props;
	const {
		stickyPostSelection,
		selectedStickyPostID,
		selectedTerms,
		postsToShow,
		displayDate,
		displayExcerpt,
		displayFeaturedImage,
	} = attributes;

	const [terms, setTerms] = useState([]);

	useEffect(() => {
		getTaxonomyTerms();
	}, []);

	const getTaxonomyTerms = () => {
		fetchOpenpub('openpub-type', '/wp-json/wp/v2/')
			.then((respone) => respone.json())
			.then((data) => {
				setTerms(data);
			})
			.catch((error) => console.error(error));
	};

	return (
		<InspectorControls>
			<PanelBody title={ __('Instellingen') }>
				<Fragment>
					<QueryControls
						{ ...{ postsToShow } }
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ (value) =>
							setAttributes({
								postsToShow: value,
							})
						}
					/>
				</Fragment>
			</PanelBody>

			<PanelBody title={ __('Weergave') } initialOpen={ false }>
				<ToggleControl
					label={ __('Display date') }
					checked={ displayDate }
					onChange={ () => setAttributes({ displayDate: !displayDate }) }
				/>
				<ToggleControl
					label={ __('Display excerpt') }
					checked={ displayExcerpt }
					onChange={ () => setAttributes({ displayExcerpt: !displayExcerpt }) }
				/>
				<ToggleControl
					label={ __('Display featured image') }
					checked={ displayFeaturedImage }
					onChange={ () =>
						setAttributes({
							displayFeaturedImage: !displayFeaturedImage,
						})
					}
				/>
			</PanelBody>

			{ !!posts.length && (
				<PanelBody title={ __(' Klevend bericht') } initialOpen={ false }>
					<CheckboxControl
						label={ __('Sticky post') }
						checked={ stickyPostSelection }
						onChange={ (checked) =>
							setAttributes({
								stickyPostSelection: checked,
								selectedStickyPostID: 0,
							})
						}
					/>

					{ stickyPostSelection && !!posts.length && (
						<div style={ { marginBottom: 20 } }>
							<Select
								value={ getSelectedPost(posts, selectedStickyPostID) }
								onChange={ ({ value }) => {
									setAttributes({ selectedStickyPostID: value });
								} }
								options={ postOptions(posts) }
							/>
						</div>
					) }

					{ stickyPostSelection && posts.length === 0 && (
						<Fragment>
							<Spinner />
							<span>{ __('Data ophalen...') }</span>
						</Fragment>
					) }
				</PanelBody>
			) }

			<PanelBody title="Type" initialOpen={ false }>
				{ terms && !!terms.length && (
					<Select
						value={ selectedTerms }
						label={ __('Selecteer type') }
						isMulti={ true }
						onChange={ (value) => {
							setAttributes({ selectedTerms: value });
						} }
						options={ terms.map(function(term) {
							return { value: term.slug, label: term.name };
						}) }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
};
