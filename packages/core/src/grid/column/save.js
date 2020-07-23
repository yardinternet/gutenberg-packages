/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { withBackground } from '../../../Containers/withBackground';
import { withSpacing } from '../../../Containers/withSpacing';
import Column from './components/column';

function save( {
	className,
	attributes,
	styles,
	spacingClasses,
	backgroundFixedClass,
	dimRatioClass,
} ) {
	const { colClassLg, colClass, colClassSm, colClassXs } = attributes;
	const classNames = classnames( [
		!! colClassLg && `col-lg-${ colClassLg }`,
		!! colClass && `col-md-${ colClass }`,
		!! colClassSm && `col-sm-${ colClassSm }`,
		!! colClassXs && `col-${ colClassXs }`,
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
