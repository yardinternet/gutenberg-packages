/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { MyContext } from '../edit';

function edit( props ) {
	const { id } = props.attributes;

	props.setAttributes( { defaultTab: props.defaultTab } );

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

		const parentBlocks = select( 'core/block-editor' ).getBlockParents(
			clientId
		);
		const parentAttributes = select(
			'core/block-editor'
		).getBlocksByClientId( parentBlocks );

		const parentDefaultTabSelection = parentAttributes[ 0 ].attributes;

		return {
			defaultTab: parentDefaultTabSelection.defaultTab,
		};
	} ),
] )( edit );
