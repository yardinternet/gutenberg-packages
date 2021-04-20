/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import {
	RangeControl,
	PanelBody,
	TabPanel,
	ToggleControl,
} from '@wordpress/components';

/**
 * External dependencies
 */
import {
	BackgroundColorControl,
	BackgroundImageControl,
	PanelMarginPadding,
} from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import ColumnOptions from './column-options';
import { getPresetColumnCount } from '../layout';

const MIN = 1;
const MAX = getPresetColumnCount();

export default class Inspector extends Component {
	render() {
		const {
			attributes,
			setColumns,
			setAttributes,
			setLayout,
			rowMinHeight,
			resizablebox,
			className,
		} = this.props;
		const {
			columns,
			bgColor,
			columnsEqualHeight,
			layoutDesktop,
			layoutTablet,
			layoutMobile,
			marginTopClass,
			marginBottomClass,
			paddingTopClass,
			paddingBottomClass,
			paddingLeftClass,
			paddingRightClass,
			rowHeight,
			rowHeightAuto,
			rowStyles,
			rowGutter,
			hasColumnContainer,
		} = attributes;

		/**
		 * Set height of row to a static height for example 400px, when dynamic height the container height is based on its content
		 *
		 * @param {boolean} value toggle staticHeight or dynamicHeight
		 * @return {Function} set dynamic or static height
		 */
		const toggleHeight = ( value ) => {
			setAttributes( {
				rowHeightAuto: ! rowHeightAuto,
			} );

			return value ? setDynamicHeight() : setStaticHeight( rowHeight );
		};

		/**
		 * Static is the specified height in px
		 *
		 * @param {number} newRowHeight height
		 */
		const setStaticHeight = ( newRowHeight ) => {
			setAttributes( {
				rowHeight: newRowHeight,
				rowHeightAuto: false,
				rowStyles: {
					...rowStyles,
					...{ minHeight: newRowHeight },
				},
			} );
		};

		/**
		 * Dynamic height is based on its content
		 */
		const setDynamicHeight = () => {
			jQuery( resizablebox.current.resizable ).css( {
				height: rowMinHeight,
			} );

			setAttributes( {
				rowStyles: {
					...rowStyles,
					...{ minHeight: 'auto' },
				},
			} );
		};

		return (
			<InspectorControls key="controls">
				<PanelBody title={ __( 'Layout' ) } initialOpen={ false }>
					<TabPanel
						className="tab-panel--layout"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'layoutDesktop',
								title: '',
								className:
									'tabpanel__btn tabpanel__btn--desktop',
							},
							{
								name: 'layoutTablet',
								title: '',
								className:
									'tabpanel__btn tabpanel__btn--tablet',
							},
							{
								name: 'layoutMobile',
								title: '',
								className:
									'tabpanel__btn  tabpanel__btn--mobile',
							},
						] }
					>
						{ ( tab ) => {
							switch ( tab.name ) {
								case 'layoutDesktop':
									return (
										<div>
											<div className="components-panel__body is-opened">
												<RangeControl
													key="select-columns"
													label={ __( 'Columns' ) }
													onChange={ setColumns }
													value={ columns }
													min={ MIN }
													max={ MAX }
												/>
											</div>
											<div>
												<ColumnOptions
													layout={ tab.name }
													setLayout={ setLayout }
													selected={ layoutDesktop }
													columns={ columns }
												/>
											</div>
										</div>
									);
								case 'layoutTablet':
									return (
										<ColumnOptions
											layout={ tab.name }
											setLayout={ setLayout }
											selected={ layoutTablet }
											columns={ columns }
										/>
									);
								case 'layoutMobile':
									return (
										<ColumnOptions
											layout={ tab.name }
											setLayout={ setLayout }
											selected={ layoutMobile }
											columns={ columns }
										/>
									);
								default:
									throw new Error( 'no valid tab' );
							}
						} }
					</TabPanel>
				</PanelBody>

				<PanelBody title={ __( 'Opties' ) } initialOpen={ false }>
					{ columns > 1 && (
						<Fragment>
							<p className={ 'yard-label' }>
								{ __( 'Row gutter' ) }
							</p>
							<ToggleControl
								label={ __( 'Gutter' ) }
								checked={ rowGutter }
								onChange={ ( gutter ) =>
									setAttributes( { rowGutter: gutter } )
								}
							/>
							<p className={ 'yard-label' }>
								{ __( 'Row columns' ) }
							</p>
							<ToggleControl
								label={ __( 'Gelijke hoogte columns' ) }
								checked={ columnsEqualHeight }
								onChange={ ( newColumnsEqualHeight ) =>
									setAttributes( {
										columnsEqualHeight: newColumnsEqualHeight,
									} )
								}
							/>
						</Fragment>
					) }

					{ layoutDesktop === 'col-1-desktop-full-width' && (
						<Fragment>
							<p className={ 'yard-label' }>{ __( 'Column' ) }</p>
							<ToggleControl
								label={ __( 'Max-width' ) }
								checked={ hasColumnContainer }
								help={ __(
									'Past op de columns in deze row een max-width toe die gelijk is aan de bootstrap "container" class.'
								) }
								onChange={ ( container ) =>
									setAttributes( {
										hasColumnContainer: container,
									} )
								}
							/>
						</Fragment>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Background' ) } initialOpen={ false }>
					<BackgroundImageControl
						{ ...{ setAttributes, attributes, className } }
					/>
					<BackgroundColorControl { ...this.props } />
					<p className={ 'yard-label' }>
						{ __( 'Background color' ) }
					</p>
					<ColorPalette
						value={ bgColor }
						onChange={ ( color ) =>
							setAttributes( { bgColor: color } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Hoogte' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Hoogte modus' ) }
						help={
							rowHeightAuto
								? __( 'Dynamische hoogte' )
								: __( 'Absolute pixels' )
						}
						checked={ rowHeightAuto }
						onChange={ toggleHeight }
					/>
					{ ! rowHeightAuto && (
						<RangeControl
							min={ 10 }
							label={ __( 'Height in px' ) }
							max={ 2000 }
							value={ parseInt( rowHeight ) }
							onChange={ setStaticHeight }
						/>
					) }
				</PanelBody>
				<PanelMarginPadding
					{ ...{
						setAttributes,
						marginTopClass,
						marginBottomClass,
						paddingTopClass,
						paddingBottomClass,
						paddingLeftClass,
						paddingRightClass,
					} }
				/>
			</InspectorControls>
		);
	}
}
