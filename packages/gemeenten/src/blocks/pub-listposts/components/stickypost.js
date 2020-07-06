import { useState, useEffect } from '@wordpress/element';
import AsyncSelect from 'react-select/async';
import { __ } from '@wordpress/i18n';
import { debounce } from 'lodash';
import { getOpenPubItems, searchOpenpub } from './api';

export function createOptions( posts = [] ) {
	return posts.map( function( post ) {
		return { value: post.id, label: post.title.rendered };
	} );
}

export function findPost( id = 0, allPosts = [] ) {
	const foundPost = allPosts.find( ( post ) => {
		return post.id === id;
	} );

	return foundPost
		? {
				value: foundPost.id,
				label: foundPost.title.rendered ?? foundPost.title,
		  }
		: false;
}

function StickyPost( { setAttributes, selectedStickyPostID } ) {
	const [ allPosts, setAllPosts ] = useState( [] );

	useEffect( () => {
		fetchSelectedPost( selectedStickyPostID );
	}, [] );

	const fetchSelectedPost = async ( value = 0 ) => {
		const data = await getOpenPubItems( `items/${ value }` );

		if ( data ) {
			transformPosts( data );
		}
	};

	const loadOptions = async ( inputValue, callback ) => {
		const data = await searchOpenpub( inputValue );

		if ( data ) {
			transformPosts( data );
			callback( createOptions( data ) );
		}
	};

	const transformPosts = ( data = [] ) => {
		const set = new Set( allPosts.concat( data ) );
		setAllPosts( Array.from( set ) );
	};

	return (
		<div style={ { marginBottom: 20 } }>
			<p> { __( 'Vul je zoekterm in om in de OpenPub te zoeken.' ) }</p>
			<AsyncSelect
				value={ findPost( selectedStickyPostID, allPosts ) }
				defaultOptions={
					findPost( selectedStickyPostID, allPosts )
						? [ findPost( selectedStickyPostID, allPosts ) ]
						: false
				}
				onChange={ ( { value } ) => {
					setAttributes( {
						selectedStickyPostID: value,
					} );
				} }
				loadOptions={ debounce( loadOptions, 500 ) }
			/>
		</div>
	);
}

export default StickyPost;
