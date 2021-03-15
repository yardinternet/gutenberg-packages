/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { MyContext } from '../edit';

function Edit( { attributes, context, setAttributes } ) {
	const { id } = attributes;

	useEffect( () => {
		setAttributes( {
			defaultTab: context[ 'yard-blocks/tabs/defaultTab' ],
			defaultTabEnabled: context[ 'yard-blocks/tabs/defaultTabEnabled' ],
		} );
	}, [ context ] );

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

export default Edit;
