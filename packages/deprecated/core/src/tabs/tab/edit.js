/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Fragment, useEffect, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { MyContext } from '../edit';

function Edit( { clientId, attributes, defaultTab, setAttributes } ) {
	const { id } = attributes;

	useEffect( () => {
		setAttributes( { defaultTab } );
	}, [ defaultTab ] );

	const { getClientIdsWithDescendants, getBlockAttributes } = useSelect(
		( select ) => ( {
			getClientIdsWithDescendants:
				select( 'core/block-editor' ).getClientIdsWithDescendants(),
			getBlockAttributes:
				select( 'core/block-editor' ).getBlockAttributes,
		} )
	);

	/**
	 * Get the block ID, ensuring it is unique.
	 * 1. Check if the ID already exists on other block attributes
	 * 2. The ID needs to be changed to the client ID in the following scenarios:
	 * - There is no ID at all
	 * - Another block already has the same ID as an attribute (can happen when duplicating a block)
	 *
	 * @return {string} The block ID.
	 */
	const getBlockId = useCallback( () => {
		const idAlreadyExist = getClientIdsWithDescendants?.some(
			( _clientId ) => {
				const { id: _id } = getBlockAttributes( _clientId );
				return clientId !== _clientId && id === _id;
			}
		);

		if ( ! id || id.length <= 0 || idAlreadyExist ) {
			return clientId;
		}

		return id;
	}, [ clientId, id, getClientIdsWithDescendants, getBlockAttributes ] );

	useEffect( () => {
		setAttributes( { id: getBlockId() } );
	}, [ setAttributes, getBlockId ] );

	return (
		<Fragment>
			<MyContext.Consumer>
				{ ( { activeTab } ) => (
					<div
						className={ classnames( {
							'd-none': id !== activeTab,
						} ) }
					>
						<InnerBlocks templateLock={ false } />
					</div>
				) }
			</MyContext.Consumer>
		</Fragment>
	);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { clientId } = props;

		const parentBlocks =
			select( 'core/block-editor' ).getBlockParents( clientId );
		const parentData =
			select( 'core/block-editor' ).getBlocksByClientId( parentBlocks );
		const innerBlock = 'yard-blocks/tabs';

		for ( let i = 0; i < parentData.length; i++ ) {
			if ( parentData[ i ].name === innerBlock ) {
				const { defaultTab } = parentData[ i ].attributes;

				return {
					defaultTab,
				};
			}
		}
	} ),
] )( Edit );
