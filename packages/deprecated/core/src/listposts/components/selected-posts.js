/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Ordered list of the manually selected posts, with buttons to reorder or remove them.
 *
 * @param {Object}   props
 * @param {Array}    props.posts    selected posts ({ value, label, ... })
 * @param {Function} props.onChange called with the new array of posts
 */
function SelectedPosts( { posts = [], onChange } ) {
	if ( ! posts.length ) {
		return null;
	}

	const move = ( from, to ) => {
		const next = [ ...posts ];
		next.splice( to, 0, next.splice( from, 1 )[ 0 ] );
		onChange( next );
	};

	const remove = ( index ) =>
		onChange( posts.filter( ( _post, i ) => i !== index ) );

	return (
		<ol style={ { margin: '8px 0 16px', padding: 0, listStyle: 'none' } }>
			{ posts.map( ( post, index ) => {
				const title = decodeEntities( String( post.label ?? '' ) );

				return (
					<li
						key={ `${ post.baseUrl ?? '' }-${ post.value }` }
						style={ {
							display: 'flex',
							alignItems: 'center',
							gap: 4,
							padding: '4px 0',
							borderBottom: '1px solid #e0e0e0',
						} }
					>
						<span style={ { minWidth: 20, color: '#757575' } }>
							{ index + 1 }.
						</span>
						<span
							style={ {
								flex: 1,
								minWidth: 0,
								overflowWrap: 'anywhere',
							} }
						>
							{ title }
						</span>
						<Button
							size="small"
							icon="arrow-up-alt2"
							label={ sprintf(
								/* translators: %s: post title */
								__( '%s omhoog verplaatsen' ),
								title
							) }
							showTooltip
							disabled={ index === 0 }
							accessibleWhenDisabled
							onClick={ () => move( index, index - 1 ) }
						/>
						<Button
							size="small"
							icon="arrow-down-alt2"
							label={ sprintf(
								/* translators: %s: post title */
								__( '%s omlaag verplaatsen' ),
								title
							) }
							showTooltip
							disabled={ index === posts.length - 1 }
							accessibleWhenDisabled
							onClick={ () => move( index, index + 1 ) }
						/>
						<Button
							size="small"
							icon="no-alt"
							label={ sprintf(
								/* translators: %s: post title */
								__( '%s verwijderen' ),
								title
							) }
							showTooltip
							isDestructive
							onClick={ () => remove( index ) }
						/>
					</li>
				);
			} ) }
		</ol>
	);
}

export default SelectedPosts;
