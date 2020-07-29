/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { MyContext } from '../edit';

function edit( { attributes } ) {
	const { id } = attributes;

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

export default edit;
