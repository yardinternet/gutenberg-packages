/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	withBackground,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Column from './components/column';

function save( {
	className,
	attributes,
	styles,
	spacingClasses,
	backgroundFixedClass,
	dimRatioClass,
} ) {
	const { colClassLg, colClass, colClassSm, colClassXs, displayBlock } =
		attributes;

	const classNames = classnames( [
		!! colClassLg && `col-lg-${ colClassLg }`,
		!! colClass && `col-md-${ colClass }`,
		!! colClassSm && `col-sm-${ colClassSm }`,
		!! colClassXs && `col-${ colClassXs }`,
		! displayBlock && 'd-none is-hidden',
		className,
	] );

	return (
		<Column
			className={ classNames }
			innerStyles={ styles }
			innerClassName={ [
				spacingClasses,
				backgroundFixedClass,
				dimRatioClass,
				'column',
			] }
		>
			<InnerBlocks.Content />
		</Column>
	);
}

export default compose( [ withBackground(), withSpacing() ] )( save );
