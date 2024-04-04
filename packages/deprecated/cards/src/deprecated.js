/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Cards from './components/cards';

const deprecated = [
	{
		attributes: {
			cardCount: {
				type: 'number',
			},
			overflowOnMobile: {
				type: 'boolean',
				default: false,
			},
			cardsEqualHeight: {
				type: 'boolean',
				default: false,
			},
			cardsPerRow: {
				type: 'number',
				default: 0,
			},
		},
		save( props ) {
			return (
				<Cards { ...props }>
					<InnerBlocks.Content />
				</Cards>
			);
		},
	},
];

export default deprecated;
