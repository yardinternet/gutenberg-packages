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

import { fetchListPosts, fetchCustomViews, fetchTaxonomies } from './api';
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
		const { setAttributes } = this.props;
		const { isMultipleSourcesEnabled } = this.props.attributes;

		if (
			prevProps.attributes.isMultipleSourcesEnabled !==
			isMultipleSourcesEnabled
		) {
			let postTypes = [
				...this.state.postTypes,
				...[
					{
						name: 'Alleen externe',
						slug: 'external',
						rest_base: 'external',
					},
				],
			];

			if ( ! isMultipleSourcesEnabled ) {
				postTypes = this.state.postTypes.filter( ( postType ) => {
					return postType.slug !== 'external';
				} );
				setAttributes( { postType: '' } );
			}

			this.setState( {
				postTypes,
			} );
		}
	}

	/**
	 * Set the postType to query posts
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
	 * Get postTypes that are available by the wp rest api
	 *
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

			if ( allowAnyPostType ) {
				result = [
					...[ { name: 'Alle', slug: 'any', rest_base: 'any' } ],
					...result,
				];
			}

			this.setState( {
				postTypes: [ ...this.state.postTypes, ...result ],
			} );

			// If there is a posttype fetch the posts to populate include or exclude
			if ( postType ) {
				this.getPosts( postType );
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
	getPosts = async ( postType = '' ) => {
		const { setAttributes } = this.props;

		let posts = [];

		const postTypeObj = find( this.state.postTypes, [ 'slug', postType ] );

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
