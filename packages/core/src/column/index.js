/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { backgroundAttributes } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Column from './components/column';
import { attributes, name } from './settings';
import deprecated from './deprecated';

const icon = 'fas fa-columns';

const settings = {
	title: __( 'Column' ),
	parent: [ 'yard-blocks/row' ],
	description: __( 'A single column within a row block.' ),
	supports: {
		inserter: false,
	},
	attributes: { ...attributes, ...backgroundAttributes },

	edit: ( props ) => {
		const { setAttributes } = props;

		return (
			<Column { ...props }>
				<Inspector key="inspector" { ...{ setAttributes, ...props } } />
				<InnerBlocks templateLock={ false } />
			</Column>
		);
	},

	save: ( props ) => (
		<Column { ...props }>
			<InnerBlocks.Content />
		</Column>
	),
	deprecated,
};

export { icon, name, settings };
