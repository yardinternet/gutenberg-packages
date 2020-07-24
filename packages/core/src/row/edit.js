/**
 * External dependencies
 */
import times from 'lodash/times';
/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import ToolbarControls from './components/toolbar-controls';
import Row from './components/row';
import SelectLayout from './components/select-layout';
import { findLayoutByID } from './layout';

const { Fragment, Component, createRef } = wp.element;
const { InnerBlocks } = wp.editor;

const ALLOWED_BLOCKS = [ 'yard-blocks/column' ];

const rowMinHeight = 150;
class RowEdit extends Component {
	constructor( props ) {
		super( props );
		this.resizableboxRef = createRef();
	}

	render() {
		const { setAttributes, attributes } = this.props;
		const {
			layoutDesktop,
			rowHeight,
			rowHeightAuto,
			rowStyles,
		} = attributes;

		/**
		 * SetColumn helper passed down to child components
		 *
		 * @param {number} amount - Amount
		 */
		const setColumns = ( amount ) => {
			setAttributes( {
				columns: amount,
			} );
		};

		const renderColumnsTemplate = () => {
			const desktopDetails = findLayoutByID( layoutDesktop );

			return times( desktopDetails.col, ( n ) => [
				'yard-blocks/column',
				{ id: n + 1 },
			] );
		};

		/**
		 * Sets the layout type and renders the colomuns
		 *
		 * @param {string} layout - Layout
		 * @param {string} id - id
		 */
		const setLayout = ( layout, id ) => {
			setAttributes( {
				[ layout ]: id,
			} );

			renderColumnsTemplate();
		};

		return (
			<Fragment>
				<ToolbarControls { ...this.props } />
				<Inspector
					key="inspector"
					resizablebox={ this.resizableboxRef }
					{ ...{
						setLayout,
						setColumns,
						rowMinHeight,
						...this.props,
					} }
				/>
				{ layoutDesktop.length ? (
					<ResizableBox
						ref={ this.resizableboxRef }
						className="resizablebox"
						minHeight={ rowMinHeight }
						min={ 1 }
						max={ 2000 }
						size={ { height: rowHeightAuto ? 'auto' : rowHeight } }
						enable={ {
							top: false,
							right: false,
							bottom: true,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						} }
						onResize={ ( event, direction, ref ) => {
							setAttributes( {
								rowStyles: {
									...rowStyles,
									...{ minHeight: ref.style.height },
								},
							} );
						} }
						onResizeStop={ ( event, direction, elt, delta ) => {
							setAttributes( {
								rowHeightAuto: false,
								rowHeight:
									parseInt( rowHeight, 10 ) + delta.height,
							} );
						} }
					>
						<Row { ...this.props }>
							<InnerBlocks
								templateLock="all"
								template={ renderColumnsTemplate() }
								allowedBlocks={ ALLOWED_BLOCKS }
							/>
						</Row>
					</ResizableBox>
				) : (
					<SelectLayout { ...this.props } />
				) }
			</Fragment>
		);
	}
}

export default RowEdit;
