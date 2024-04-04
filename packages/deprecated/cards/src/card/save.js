/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Card from '../components/card';
import { getCardWidth, getTemplate } from './helpers';

function save( { attributes, className } ) {
	const { parentCardCount, selectedTemplate } = attributes;
	const width = getCardWidth( parentCardCount );

	const cardStyles = {
		minWidth: `${ width }%`,
		maxWidth: `${ width }%`,
	};

	const template = getTemplate( selectedTemplate );

	if ( ! template ) {
		return null;
	}

	const { cardClass, innerCardClass } = template;
	const cardClassName = classnames(
		className,
		cardClass,
		`card-width-${ parseFloat( width ).toFixed( 0 ) }`
	);

	return (
		<Card
			{ ...{
				className: cardClassName,
				styles: cardStyles,
				innerCardClass,
			} }
		>
			<InnerBlocks.Content />
		</Card>
	);
}

export default save;
