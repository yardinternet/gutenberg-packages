/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * External dependencies
 */
import classnames from 'classnames';

function save( { attributes } ) {
	const { id } = attributes;
	return (
		<div
			role="tabpanel"
			className={ classnames(
				{ 'active show': id === 'tab-1' },
				'tab-pane fade'
			) }
			id={ `tab-panel-${ id }` }
		>
			<InnerBlocks.Content />
		</div>
	);
}

export default save;
