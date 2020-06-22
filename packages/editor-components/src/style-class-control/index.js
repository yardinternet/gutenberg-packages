/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters, addFilter } from '@wordpress/hooks';

const pluginName = 'yard-blocks';

export const StyleClassControl = () => {
	/**
	 * Add styleClass attribute
	 *
	 * Usage
	 *
	 * addFilter( 'yard-blocks.styleClassBlocks', name, () => {
	 *	return [ 'core/paragraph', 'core/button' ];
	 * } );
	 *
	 * @param {*} props
	 * @return {Object} props
	 */
	const registerBlockTypeStyleClass = ( props ) => {
		const { name } = props;

		const styleClassBlocks = applyFilters(
			`yard-blocks.styleClassBlocks`,
			[]
		);

		if ( ! styleClassBlocks.includes( name ) ) {
			return props;
		}

		const attr = {
			...props.attributes,
			...{
				styleClass: { type: 'string', default: '' },
			},
		};

		return { ...props, ...{ attributes: attr } };
	};

	addFilter(
		'blocks.registerBlockType',
		pluginName,
		registerBlockTypeStyleClass
	);

	/**
	 * Add styleClass options to BlockEdit
	 *
	 * Usage
	 *
	 * addFilter( 'yard-blocks.styleClassOptions.core-paragraph', pluginName, ( styleClass ) => {
	 *	return [ { label: 'Primary', value: 'bg-primary' }, { label: 'Secondary', value: 'bg-secondary' } ];
	 * } );
	 *
	 * @param {Object} BlockEdit
	 * @return {Object} BlockEdit
	 */
	const withInspectorControls = ( BlockEdit ) => {
		return ( props ) => {
			const { attributes, setAttributes, name } = props;

			if ( attributes.styleClass === undefined ) {
				return <BlockEdit { ...props } />;
			}

			const { styleClass } = attributes;

			const options = applyFilters(
				`yard-blocks.styleClassOptions.${ name.replace( '/', '-' ) }`,
				[ { label: 'Geen stijl', value: '' } ]
			);

			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody title={ __( 'Extra stijlen' ) }>
							<SelectControl
								label="Selecteer stijl"
								value={ styleClass }
								options={ options }
								onChange={ ( size ) => {
									setAttributes( { styleClass: size } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		};
	};

	addFilter( 'editor.BlockEdit', pluginName, withInspectorControls );

	/**
	 * Add styleClass to className
	 *
	 * @param {*} props
	 * @param {*} blockType
	 * @param {*} attributes
	 * @return {Object} props
	 */
	const addStyleClassProp = ( props, blockType, attributes ) => {
		const { className } = props;

		if ( attributes.styleClass === undefined ) {
			return props;
		}

		const { styleClass } = attributes;

		return {
			...props,
			...{ className: classnames( className, styleClass ) },
		};
	};

	addFilter(
		'blocks.getSaveContent.extraProps',
		pluginName,
		addStyleClassProp
	);

	/**
	 * Add styleClass to className in editor
	 *
	 * @param {*} BlockListBlock
	 * @return {Object} BlockListBlock
	 */
	const withBlockEditStyleClass = ( BlockListBlock ) => {
		return ( props ) => {
			const { attributes, className } = props;

			if ( attributes.styleClass === undefined ) {
				return <BlockListBlock { ...props } />;
			}

			const newProps = {
				...props,
				...{
					className: classnames( className, attributes.styleClass ),
				},
			};

			return <BlockListBlock { ...newProps } />;
		};
	};

	addFilter( 'editor.BlockListBlock', pluginName, withBlockEditStyleClass );
};
