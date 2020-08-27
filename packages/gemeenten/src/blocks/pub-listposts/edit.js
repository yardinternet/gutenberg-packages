/**
 * WordPress dependencies
 */
import { Placeholder, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
/**
 * Internal dependencies
 */
import { getOpenPubItems } from './../../api';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';

export default ( props ) => {
	const { attributes } = props;
	const [ posts, setPosts ] = useState( [] );
	const hasPosts = Array.isArray( posts ) && posts.length;

	useEffect( () => {
		getPosts();
	}, [] );

	const getPosts = async () => {
		const data = await getOpenPubItems( 'items' );

		setPosts( data.data );
	};

	return (
		<>
			<Inspector { ...{ posts, ...props } } />
			{ ! hasPosts ? (
				<Placeholder
					icon="excerpt-view"
					label={ __( 'Post Block', '' ) }
				>
					{ ! Array.isArray( posts ) ? (
						<Spinner />
					) : (
						__( 'No posts found or endpoint could not be fetched.' )
					) }
				</Placeholder>
			) : (
				<ServerSideRender
					block="gemeenten/list-posts-openpub"
					attributes={ attributes }
				/>
			) }
		</>
	);
};
