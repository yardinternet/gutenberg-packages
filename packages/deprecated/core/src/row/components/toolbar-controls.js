/**
 * WordPress dependencies
 */
import { BlockControls, MediaUpload } from '@wordpress/block-editor';
import {
	ToolbarGroup,
	Tooltip,
	Button,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classNames from 'classnames';
import { icons } from '@yardinternet/gutenberg-editor-components';

const ToolbarControls = ( props ) => {
	const { setAttributes, attributes } = props;
	const { alignVertical } = attributes;

	return (
		<BlockControls key="controls">
			<ToolbarGroup>
				<MediaUpload
					onSelect={ ( img ) =>
						setAttributes( { bgImgUrl: img.url } )
					}
					type="image"
					value={ null }
					render={ ( { open } ) => (
						<ToolbarButton
							className="components-toolbar__control"
							label={ __( 'Achtergrondafbeelding' ) }
							icon="format-image"
							onClick={ open }
						/>
					) }
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<Tooltip text={ __( 'Verticaal uitlijnen boven' ) }>
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
			</ToolbarGroup>
			<ToolbarGroup>
				<Tooltip text={ __( 'Verticaal uitlijnen midden' ) }>
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
			</ToolbarGroup>
			<ToolbarGroup>
				<Tooltip text={ __( 'Verticaal uitlijnen beneden' ) }>
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
			</ToolbarGroup>
		</BlockControls>
	);
};

export default ToolbarControls;
