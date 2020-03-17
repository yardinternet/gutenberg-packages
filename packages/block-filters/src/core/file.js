import { blocks } from '../config';

import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody>My custom control</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl' );

const register = () => {
	wp.hooks.addFilter(
		'editor.BlockEdit',
		'my-plugin/with-inspector-controls',
		withInspectorControls
	);
};

const name = blocks.coreFile;

export { register, name };
