/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function save( props ) {
	const { defaultTab, id } = props.attributes;

	return (
		<div
			role="tabpanel"
			className={ classnames(
				{ 'active show': id === defaultTab },
				'tab-pane fade'
			) }
			id={ `tab-panel-${ id }` }
		>
			<InnerBlocks.Content />
		</div>
	);
}

export default save;
