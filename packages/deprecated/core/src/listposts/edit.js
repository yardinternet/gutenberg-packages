/**
 * External dependencies
 */
import { find } from 'lodash';
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { Component, Fragment, createRef } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import SSR from './components/ssr';
import SelectPostTypeControl from './components/select-posttype-control';

import {
	fetchListPosts,
	fetchCustomViews,
	fetchTaxonomies,
	fetchExternalTaxonomies,
} from './api';
import {
	filterPostTypes,
	mapPosts,
	mapAnyPosts,
	mapEvents,
	filterTaxonomies,
} from './utils';

/**
 * Event calendar has a custom rest route
 */
const eventCalendarPostType = {
	name: __( 'Events' ),
	slug: 'tribe_events',
	rest_base: 'tribe/events/v1/events',
};

class ListPostsEdit extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			// Disable event calendar in yard blocks admin settings
			postTypes:
				blockSettings.theEventCalendarEnabled === 'true' // eslint-disable-line
					? [ eventCalendarPostType ]
					: [],
			posts: [],
			taxonomies: [],
			externalTaxonomiesResolved: false,
			externalTaxonomies: [],
			customViews: {},
			customView: '',
			supportsNumberPerRow: false,
		};

		this.reactSelect = createRef();
	}

	componentDidMount() {
		this.getPostTypes();
		this.getCustomViews();
		this.getTaxonomies();
	}

	componentDidUpdate( prevProps ) {
		const { isMultipleSourcesEnabled } = this.props.attributes;

		if (
			prevProps.attributes.isMultipleSourcesEnabled !==
			isMultipleSourcesEnabled
		) {
			this.removeAdditionalPostTypes();
		}

		if (
			! this.state.externalTaxonomies.length &&
			! this.state.externalTaxonomiesResolved
		) {
			this.getExternalTaxonomies();
			this.setState( { externalTaxonomiesResolved: true } );
		}
	}

	removeAdditionalPostTypes = () => {
		const { setAttributes } = this.props;
		const { isMultipleSourcesEnabled, postType } = this.props.attributes;

		const additionalPostTypes = [
			{
				name: 'Alle',
				slug: 'any',
				rest_base: 'any',
			},
			{
				name: 'Alleen externe',
				slug: 'external',
				rest_base: 'external',
			},
		];

		let postTypes = [ ...this.state.postTypes, ...additionalPostTypes ];

		// When isMultipleSourcesEnabled is false, posttype 'external' is not needed.
		if ( ! isMultipleSourcesEnabled ) {
			postTypes = postTypes.filter( ( type ) => {
				return type.slug !== 'external';
			} );
		}

		// postType with slug 'any' only works with wp_query (used in back-end).
		// When isMultipleSourcesEnabled is true, local posts are retrieved by the api.
		if ( isMultipleSourcesEnabled ) {
			postTypes = postTypes.filter( ( type ) => {
				return type.slug !== 'any';
			} );
		}

		if ( postType === 'any' || postType === 'external' )
			setAttributes( { postType: '' } );

		this.setState( {
			postTypes,
		} );
	};

	/**
	 * Set the postType to query posts.
	 *
	 * @param {string} postType postType
	 */
	setPostType = ( postType ) => {
		const { setAttributes } = this.props;

		setAttributes( {
			postType,
			selectedPosts: [],
			excludedPosts: [],
		} );

		if ( postType !== 'external' ) {
			this.getPosts( postType );
		}
	};

	/**
	 * Get postTypes that are available by the wp rest api.
	 */
	getPostTypes = async () => {
		const { postType, isMultipleSourcesEnabled } = this.props.attributes;

		try {
			let result = filterPostTypes( await fetchListPosts( 'types' ) );
			const allowAnyPostType = applyFilters(
				'yard-blocks.listPostsAllowAnyPostType',
				true
			);

			if ( isMultipleSourcesEnabled ) {
				result = [
					...[
						{
							name: __( 'Alleen externe' ),
							slug: 'external',
							rest_base: 'external',
						},
					],
					...result,
				];
			}

			if ( allowAnyPostType && ! isMultipleSourcesEnabled ) {
				result = [
					...[ { name: 'Alle', slug: 'any', rest_base: 'any' } ],
					...result,
				];
			}

			const postTypes = [ ...this.state.postTypes, ...result ];

			this.setState( { postTypes } );

			// If there is a posttype fetch the posts to populate include or exclude
			if ( postType ) {
				this.getPosts( postType, postTypes );
			}
		} catch ( e ) {
			throw new Error( e.message );
		}
	};

	/**
	 * Get posts by postType
	 *
	 * @param {string} postType postType
	 * @return {Array} posts posts
	 */
	getPosts = async ( postType = '', postTypes = this.state.postTypes ) => {
		const { setAttributes } = this.props;
		let posts = [];

		const postTypeObj = find( postTypes, [ 'slug', postType ] );

		if (
			typeof postTypeObj !== 'object' ||
			postTypeObj.rest_base === 'external'
		) {
			return posts;
		}

		try {
			switch ( postType ) {
				case 'tribe_events':
					posts = mapEvents(
						await fetchListPosts( `${ postTypeObj.rest_base }`, '' )
					);
					break;
				case 'any':
					posts = mapAnyPosts(
						await fetchListPosts(
							'yard/blocks/v1/list-posts/posts/any',
							''
						)
					);
					break;
				default:
					posts = mapPosts(
						await fetchListPosts( `${ postTypeObj.rest_base }` )
					);
			}
		} catch ( e ) {
			setAttributes( {
				customSelection: false,
				selectedPosts: [],
				excludedPosts: [],
				stickyPostSelection: false,
			} );

			throw new Error( e.message );
		} finally {
			this.setState( {
				posts,
			} );
		}
	};

	async getExternalTaxonomies() {
		const { isMultipleSourcesEnabled } = this.props.attributes;

		if ( ! isMultipleSourcesEnabled ) {
			return;
		}

		try {
			this.setState( {
				externalTaxonomies: await fetchExternalTaxonomies(),
			} );
		} catch ( e ) {
			throw new Error( e.message );
		}
	}

	/**
	 * Get taxonomies
	 */
	async getTaxonomies() {
		try {
			this.setState( {
				taxonomies: filterTaxonomies( await fetchTaxonomies() ),
			} );
		} catch ( e ) {
			throw new Error( e.message );
		}
	}

	/**
	 * Get customViews that are available from the theme
	 */
	async getCustomViews() {
		let customViews = [];

		try {
			customViews = await fetchCustomViews();
			this.setState( {
				customViews,
			} );
		} catch ( e ) {
			throw new Error( e.messsage );
		}
	}

	render() {
		const { attributes } = this.props;
		const { postType, isNonWpSourcesEnabled } = attributes;
		const {
			posts,
			postTypes,
			taxonomies,
			externalTaxonomies,
			customViews,
			customView,
			supportsNumberPerRow,
		} = this.state;

		const { setPostType } = this;

		return (
			<Fragment>
				<Inspector
					{ ...{
						setPostType,
						postTypes,
						posts,
						taxonomies,
						externalTaxonomies,
						customViews,
						customView,
						supportsNumberPerRow,
						...this.props,
					} }
				/>

				{ ! postType && ! isNonWpSourcesEnabled ? (
					<Placeholder
						icon={
							<BlockIcon
								faClasses="fal fa-hammer"
								marginRight={ true }
							/>
						}
						label={ __( 'Berichtenlijst' ) }
					>
						<SelectPostTypeControl
							{ ...{
								setPostType,
								postType,
								postTypes,
								...this.props,
							} }
						/>
					</Placeholder>
				) : (
					<SSR { ...this.props } />
				) }
			</Fragment>
		);
	}
}

export default ListPostsEdit;
