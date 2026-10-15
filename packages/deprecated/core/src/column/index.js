/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import {
	backgroundAttributes,
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Column from './components/column';
import { attributes, name } from './settings';
import deprecated from './deprecated';

const icon = 'fas fa-columns';

const settings = {
	apiVersion: 3,
	title: __( 'Rijkolom' ),
	parent: [ 'yard-blocks/row' ],
	description: __( 'Een enkele kolom binnen een rij.' ),
	supports: {
		inserter: false,
	},
	attributes: { ...attributes, ...backgroundAttributes },

	edit: withBlockWrapper( ( props ) => {
		const { setAttributes } = props;

		return (
			<Column { ...props }>
				<Inspector key="inspector" { ...{ setAttributes, ...props } } />
				<InnerBlocks templateLock={ false } />
			</Column>
		);
	} ),

	save: withV1Save( ( props ) => (
		<Column { ...props }>
			<InnerBlocks.Content />
		</Column>
	) ),
	deprecated,
};

export { icon, name, settings };
