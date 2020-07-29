/**
 * Internal dependencies
 */
import Card from './components/card';

const { Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

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
