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

function edit( { attributes, defaultTab, setAttributes } ) {
	const { id } = attributes;

	setAttributes( { defaultTab } );

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
		const parentData = select( 'core/block-editor' ).getBlocksByClientId(
			parentBlocks
		);

		const { defaultTab } = parentData[ 0 ].attributes;

		return {
			defaultTab,
		};
	} ),
] )( edit );
