/**
 * External dependencies
 */
import classnames from 'classnames';
import { getColorClassByColor } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import icons from './settings/icons';
import Icon from './components/icon';
import Inspector from './components/inspector';
import { createIconsArray } from './utils';

const { __ } = wp.i18n;

const { Fragment } = wp.element;
const { RichText } = wp.editor;
const { Placeholder } = wp.components;

const Edit = ( props ) => {
	const { attributes, setAttributes, isSelected } = props;
	const {
		content,
		description,
		descriptionColor,
		descriptionFontSize,
	} = attributes;

	const spanStyle = { marginLeft: '10px' };
	const placeholder = 'Typ om een icon te zoeken';

	// Description
	const descriptionColorSlug = getColorClassByColor(
		yardBlocks.editorColorPalette,
		descriptionColor
	);
	const descriptionClasses = classnames(
		'yard-blocks-fontawesome__autocomplete',
		`text-${ descriptionColorSlug }`
	);

	const descriptionStyles = {
		fontSize: descriptionFontSize
			? `${ descriptionFontSize }px`
			: undefined,
	};

	const completer = [
		{
			name: 'icons',
			triggerPrefix: '',
			options: () => createIconsArray( icons ),
			getOptionLabel: ( option ) => (
				<span>
					<i
						id={ option.id }
						className={ `${ option.type } fa-${ option.visual }` }
					></i>
					<span style={ spanStyle }>{ option.name }</span>
				</span>
			),
			getOptionKeywords: ( option ) => [ option.name ],
			isDebounced: true,
			getOptionCompletion: ( option ) => (
				setAttributes( { style: option.type } ), option.name
			),
		},
	];

	return (
		<Fragment>
			<Inspector key="inspector" { ...{ setAttributes, ...props } } />
			{ isSelected ? (
				<Placeholder icon="share-alt" label={ __( 'FontAwesome' ) }>
					<div className="components-placeholder__label yard-blocks-fontawesome__label">
						{ __( 'Selecteer icoon:' ) }
					</div>
					<div className="yard-blocks-fontawesome__autocomplete-container">
						<RichText
							tagName="div"
							value={ content }
							className={
								'yard-blocks-fontawesome__autocomplete'
							}
							placeholder={ placeholder }
							onChange={ ( newContent ) =>
								setAttributes( { content: newContent } )
							}
							autocompleters={ completer }
							allowedFormats="array"
							formattingControls={ [] }
						/>
						{ content && (
							<div className="yard-blocks-fontawesome__icon-preview">
								<Icon mode="selected" { ...props } />
							</div>
						) }
					</div>
					<div className="components-placeholder__label yard-blocks-fontawesome__label">
						{ __( 'Beschrijving(optioneel)' ) }
					</div>
					<RichText
						style={ descriptionStyles }
						tagName="span"
						value={ description }
						className={ descriptionClasses }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
					/>
				</Placeholder>
			) : (
				<Icon { ...props } />
			) }
		</Fragment>
	);
};

export default Edit;
