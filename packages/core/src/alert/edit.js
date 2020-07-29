/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import Alert from './components/alert';
import { Fragment } from '@wordpress/element';

import Inspector from './components/inspector';

function edit( props ) {
	const { setAttributes } = props;

	const ALLOWED = [ 'core/heading', 'core/paragraph' ];
	const TEMPLATE = [
		[ 'core/heading', { placeholder: __( 'Titel' ) } ],
		[ 'core/paragraph', { placeholder: __( 'Content' ) } ],
	];

	const allowedBlocks = applyFilters( 'yard-blocks.allowedBlocks', ALLOWED );

	return (
		<Fragment>
			<Inspector key="inspector" { ...{ setAttributes, ...props } } />
			<Alert { ...props }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ TEMPLATE }
				/>
			</Alert>
		</Fragment>
	);
}

export default edit;
