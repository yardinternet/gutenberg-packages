/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { TextControl, SelectControl } from '@wordpress/components';

const name = 'yard-blocks/sticky';
const icon = 'fal fa-thumbtack';

const settings = {
	title: __( 'Sticky' ),
	description: __( 'Zet block sticky op top of bottom' ),
	attributes: {
		showOnScrollSelector: {
			type: 'string',
		},
		position: {
			type: 'string',
			default: 'bottom',
		},
	},
	edit: ( props ) => {
		const {
			setAttributes,
			attributes: { showOnScrollSelector, position },
		} = props;

		const positionOptions = [
			{
				label: 'Bottom',
				value: 'bottom',
			},
			{
				label: 'Top',
				value: 'top',
			},
		];

		return (
			<>
				<InspectorControls>
					<SelectControl
						label={ __( 'Positie:' ) }
						value={ position }
						onChange={ ( val ) =>
							setAttributes( { position: val } )
						}
						options={ positionOptions }
					/>
					<TextControl
						label={ __( 'Selectors:' ) }
						value={ showOnScrollSelector }
						onChange={ ( val ) =>
							setAttributes( { showOnScrollSelector: val } )
						}
						help={ __(
							'Sticky verschijnt in beeld wanneer er voorbij de de totale hoogte van de selectors wordt gescrolled, voorbeeld: .header .navbar'
						) }
					/>
				</InspectorControls>
				<div className="yard-blocks-sticky">
					<InnerBlocks />
				</div>
			</>
		);
	},

	save: ( props ) => {
		const { className, attributes } = props;
		const { showOnScrollSelector, position } = attributes;

		const styles = {
			[ position ]: 0,
		};

		return (
			<div
				style={ styles }
				className={ classnames( 'yard-blocks-sticky', className ) }
				data-show-on-scroll-selector={ showOnScrollSelector }
			>
				<div className="yard-blocks-sticky__container">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { icon, name, settings };
