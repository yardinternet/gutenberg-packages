/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SocialShare from './components/socialshare';
import Inspector from './inspector';

function Edit( props ) {
	const { setAttributes } = props;

	const { title, url } = useSelect( ( select ) => {
		return {
			title: select( 'core/editor' ).getEditedPostAttribute( 'title' ),
			url: select( 'core/editor' ).getPermalink(),
		};
	} );

	useEffect( () => {
		if ( title ) {
			setAttributes( { pageTitle: title } );
		}
	}, [ title ] );

	useEffect( () => {
		if ( url ) {
			setAttributes( { pageUrl: url } );
		}
	}, [ url ] );

	return (
		<>
			<Inspector key="inspector" { ...{ setAttributes, ...props } } />
			<SocialShare view="edit" { ...props } />
		</>
	);
}

export default Edit;
