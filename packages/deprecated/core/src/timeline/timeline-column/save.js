/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	withBackgroundClass,
	withBackgroundImage,
	withSpacing,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';

function save( {
	className,
	attributes,
	styles,
	backgroundColorClass,
	spacingClasses,
} ) {
	const { colClass, isHidden, timelineColor } = attributes;
	const classNames = classnames(
		!! colClass && `col-md-${ colClass }`,
		className
	);

	return (
		<div className={ classNames } style>
			<div
				style={ styles }
				className={ classnames(
					backgroundColorClass,
					spacingClasses,
					'column',
					{
						'd-none': isHidden,
					}
				) }
			>
				<div className="timeline-step">
					<span
						className="timeline-step__line"
						style={ { backgroundColor: `${ timelineColor }` } }
					/>
					<span
						className="timeline-step__circle"
						style={ { color: `${ timelineColor }` } }
					/>
				</div>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default compose( [
	withBackgroundClass( 'bgColor' ),
	withBackgroundImage(),
	withSpacing(),
] )( save );
