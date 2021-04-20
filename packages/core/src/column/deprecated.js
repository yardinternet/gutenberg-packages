/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Column from './components/column';
import ColumnDeprecated from './components/column-deprecated';
import { attributes } from './settings';

const deprecated = [
	// Deprecated version is used in EVB Plus
	{
		attributes,

		save: ( props ) => {
			return (
				<ColumnDeprecated { ...props }>
					<InnerBlocks.Content />
				</ColumnDeprecated>
			);
		},
	},
	// Set default of isFlex to true
	{
		attributes: {
			...attributes,
			isFlex: {
				type: 'boolean',
				default: true,
			},
		},

		isEligible: () => {
			return true;
		},

		save: ( props ) => {
			return (
				<Column { ...props }>
					<InnerBlocks.Content />
				</Column>
			);
		},
	},
];

export default deprecated;
