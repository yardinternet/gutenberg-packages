/**
 * External dependencies
 */
import classnames from 'classnames';
import { getColorClassByColor } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const Icon = ( props ) => {
	const { attributes, className, mode } = props;
	const {
		content,
		description,
		color,
		size,
		style,
		descriptionColor,
		descriptionFontSize,
	} = attributes;

	// Icon
	const iconStyles = { color };
	const containerClasses = classnames( className, 'yard-blocks-fontawesome' );
	const iconClasses = classnames(
		style,
		`fa-${ content }`,
		size,
		'yard-blocks-fontawesome__icon'
	);

	// Description
	const descriptionColorSlug = getColorClassByColor(
		yardBlocks.editorColorPalette,
		descriptionColor
	);
	const descriptionColorClass = descriptionColorSlug
		? `text-${ descriptionColorSlug }`
		: '';

	const descriptionClasses = classnames(
		'yard-blocks-fontawesome__description',
		descriptionColorClass
	);
	const descriptionStyles = {
		fontSize: descriptionFontSize
			? `${ descriptionFontSize }px`
			: undefined,
	};

	return (
		<div className={ containerClasses }>
			<i style={ iconStyles } className={ iconClasses }></i>
			{ description && mode !== 'selected' && (
				<RichText.Content
					tagName="span"
					style={ descriptionStyles }
					className={ descriptionClasses }
					value={ description }
				/>
			) }
		</div>
	);
};

export default Icon;
