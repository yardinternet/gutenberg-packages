/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Card from './components/card';

const CardSave = ( props ) => {
	const { attributes } = props;
	const { url } = attributes;

	return (
		<Card { ...props }>
			{ url ? (
				<Fragment>
					<a
						className="yard-blocks-card__container-url"
						aria-hidden
						href={ url }
					>
						{ ' ' }
					</a>
					<InnerBlocks.Content />
				</Fragment>
			) : (
				<InnerBlocks.Content />
			) }
		</Card>
	);
};

export default CardSave;
