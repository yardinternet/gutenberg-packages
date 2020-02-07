/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';

const styles = {
	paddingLeft: 0,
	listStyleType: 'none',
};

const defaultAttributes = {
	overflowOnMobile: false,
	cardsEqualHeight: false,
};

function Cards( { attributes = defaultAttributes, children, className } ) {
	const { overflowOnMobile, cardsEqualHeight, cardsPerRow } = attributes;

	const attributeClassNames = classnames( {
		'has-overflow-on-mobile': overflowOnMobile,
		'has-cards-equal-height': cardsEqualHeight,
		'has-flex-wrap': cardsPerRow > 0,
	} );

	return (
		<ul style={ styles } className={ classnames( className, attributeClassNames ) }>
			{ children }
		</ul>
	);
}

export default Cards;
