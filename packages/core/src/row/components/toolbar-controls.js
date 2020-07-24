/**
 * External dependencies
 */
import classNames from 'classnames';
import { icons } from '@yardinternet/gutenberg-editor-components';

const { BlockControls, MediaUpload } = wp.editor;
const { Toolbar, Tooltip, Button, IconButton } = wp.components;
const { __ } = wp.i18n;

const ToolbarControls = ( props ) => {
	const { setAttributes, attributes } = props;
	const { alignVertical } = attributes;

	return (
		<BlockControls key="controls">
			<Toolbar>
				<MediaUpload
					onSelect={ ( img ) =>
						setAttributes( { bgImgUrl: img.url } )
					}
					type="image"
					value={ null }
					render={ ( { open } ) => (
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Background Image' ) }
							icon="format-image"
							onClick={ open }
						/>
					) }
				/>
			</Toolbar>
			<Toolbar>
				<Tooltip text={ __( 'Vertical Align Top' ) }>
					<Button
						className={ classNames(
							'components-icon-button',
							'components-toolbar__control',
							{
								'is-active': alignVertical === 'top',
							}
						) }
						onClick={ () =>
							setAttributes( { alignVertical: 'flex-start' } )
						}
					>
						{ icons.aligntop }
					</Button>
				</Tooltip>
			</Toolbar>
			<Toolbar>
				<Tooltip text={ __( 'Vertical Align Middle' ) }>
					<Button
						className={ classNames(
							'components-icon-button',
							'components-toolbar__control',
							{
								'is-active': alignVertical === 'middle',
							}
						) }
						onClick={ () =>
							setAttributes( { alignVertical: 'center' } )
						}
					>
						{ icons.aligncenter }
					</Button>
				</Tooltip>
			</Toolbar>
			<Toolbar>
				<Tooltip text={ __( 'Vertical Align Bottom' ) }>
					<Button
						className={ classNames(
							'components-icon-button',
							'components-toolbar__control',
							{
								'is-active': alignVertical === 'bottom',
							}
						) }
						onClick={ () =>
							setAttributes( { alignVertical: 'flex-end' } )
						}
					>
						{ icons.alignbottom }
					</Button>
				</Tooltip>
			</Toolbar>
		</BlockControls>
	);
};

export default ToolbarControls;
