/**
 * WordPress dependencies
 */
import {
	createContext,
	useEffect,
	useState,
	Fragment,
} from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PlainText,
} from '@wordpress/block-editor';
import {
	ButtonGroup,
	IconButton,
	PanelBody,
	SelectControl,
	ToggleControl,
	Toolbar,
} from '@wordpress/components';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import withInnerBlocks from './helpers';

export const MyContext = createContext();

function Edit( {
	attributes,
	setAttributes,
	innerBlocks = [],
	updateTitle,
	addTab,
	removeTab,
	duplicateTab,
} ) {
	const [ activeTab, setActiveTab ] = useState( 'tab-1' );
	const { defaultTab, defaultTabEnabled, innerblocks } = attributes;

	if ( ! innerblocks.length ) {
		setAttributes( {
			innerblocks: innerBlocks,
		} );
	}

	const TEMPLATE = [
		[
			'yard-blocks/tabs-tab',
			{ title: 'Titel', id: 'tab-1', defaultTab: activeTab },
			[ [ 'core/paragraph', { content: '' } ] ],
		],
	];

	const onTabClick = ( id ) => {
		setActiveTab( id );
	};

	useEffect( () => {
		if ( ! defaultTabEnabled ) {
			setAttributes( { defaultTab: 'tab-1' } );
		}
	}, [ defaultTabEnabled ] );

	return (
		<Fragment>
			<BlockControls>
				<Toolbar label={ __( 'Tabblad opties' ) }>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Tabblad toevoegen' ) }
						icon="plus"
						onClick={ () => addTab( { onTabClick } ) }
					/>
				</Toolbar>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Instellingen' ) }>
					<ToggleControl
						label={ __( 'Actief tabblad opgeven' ) }
						help={ __( 'Standaard te openen tabblad opgeven' ) }
						checked={ defaultTabEnabled }
						onChange={ () =>
							setAttributes( {
								defaultTabEnabled: ! defaultTabEnabled,
							} )
						}
					/>
					{ defaultTabEnabled && (
						<SelectControl
							label={ __( 'Tabblad' ) }
							value={ defaultTab }
							options={ innerBlocks.map( ( props ) => ( {
								label: props.attributes.title,
								value: props.attributes.id,
							} ) ) }
							onChange={ ( value ) => {
								setAttributes( { defaultTab: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<MyContext.Provider value={ { activeTab, defaultTab } }>
				<div>
					<ul className="nav nav-tabs" role="tablist">
						{ innerBlocks.map( ( props ) => {
							const { title, id } = props.attributes;
							const active = activeTab === id;
							return (
								<li
									key={ props.clientId }
									onClick={ () => onTabClick( id ) }
									className={ classnames(
										'nav-item nav-link d-flex align-items-center',
										{
											'active show': active,
										}
									) }
									role="presentation"
								>
									<PlainText
										className="mr-3"
										value={ title }
										onChange={ ( val ) =>
											updateTitle( props.clientId, val )
										}
									/>
									{ active && (
										<ButtonGroup className="d-flex">
											<IconButton
												icon="admin-page"
												label={ __(
													'Dupliceer tabblad'
												) }
												onClick={ () =>
													duplicateTab( {
														clientId:
															props.clientId,
													} )
												}
											/>
											<IconButton
												icon="no"
												label={ __(
													'Verwijder tabblad'
												) }
												onClick={ () =>
													removeTab( {
														clientId:
															props.clientId,
													} )
												}
											/>
										</ButtonGroup>
									) }
								</li>
							);
						} ) }
					</ul>
					<div className="tab-content">
						{
							<InnerBlocks
								templateLock="insert"
								allowedBlocks={ [ 'yard-blocks/tabs-tab' ] }
								template={ TEMPLATE }
							/>
						}
					</div>
				</div>
			</MyContext.Provider>
		</Fragment>
	);
}

export default compose( [
	withInnerBlocks(),
	withSelect( ( select, props ) => {
		const { getBlocks } = select( 'core/block-editor' );

		const { clientId } = props;

		return {
			innerBlocks: getBlocks( clientId ),
		};
	} ),
	withDispatch( ( dispatch, props, registry ) => {
		const { clientId, setAttributes, onInnerBlocksRemove } = props;
		const { getBlocks, getBlockRootClientId } = registry.select(
			'core/block-editor'
		);

		const { replaceInnerBlocks, updateBlockAttributes } = dispatch(
			'core/block-editor'
		);

		const { createNotice } = dispatch( 'core/notices' );

		const innerBlocks = getBlocks( clientId );

		return {
			updateAttrInnerBlocks() {
				setAttributes( {
					innerblocks: getBlocks( clientId ),
				} );
			},
			createTabNotice( label, id ) {
				createNotice( 'info', label, {
					isDismissible: true,
					type: 'snackbar',
					id,
				} );
			},
			addTab( { onTabClick } ) {
				const innerBlock = createBlock( 'core/paragraph' );

				const newBlock = createBlock(
					'yard-blocks/tabs-tab',
					{
						id: 'x',
						title: 'Titel',
						defaultTab: 'tab-1',
					},
					[ innerBlock ]
				);

				replaceInnerBlocks(
					clientId,
					[ ...innerBlocks, ...[ newBlock ] ],
					false
				);

				updateBlockAttributes( newBlock.clientId, {
					id: newBlock.clientId,
				} );
				this.updateAttrInnerBlocks();

				this.createTabNotice( __( 'Tab toegevoegd' ), 'tab-added' );

				onTabClick( newBlock.clientId );
			},
			removeTab( removeTabProps ) {
				onInnerBlocksRemove( removeTabProps.clientId );
				this.updateAttrInnerBlocks();
				this.createTabNotice( __( 'Tab verwijderd' ), 'tab-removed' );
			},
			duplicateTab( duplicateTabProps ) {
				const rootClientId = getBlockRootClientId(
					duplicateTabProps.clientId
				);
				const blocks = getBlocks( duplicateTabProps.clientId );
				const clonedBlocks = blocks.map( ( block ) =>
					cloneBlock( block )
				);

				const newBlock = createBlock(
					'yard-blocks/tabs-tab',
					{
						id: 'x',
						title: 'Titel',
						defaultTab: 'tab-1',
					},
					clonedBlocks
				);

				replaceInnerBlocks(
					rootClientId,
					[ ...innerBlocks, ...[ newBlock ] ],
					false
				);

				updateBlockAttributes( newBlock.clientId, {
					id: newBlock.clientId,
				} );
				this.updateAttrInnerBlocks();
				this.createTabNotice(
					__( 'Tab gedupliceerd' ),
					'tab-duplicated'
				);
			},
			updateTitle( TabClientId, title ) {
				updateBlockAttributes( TabClientId, { title } );
				this.updateAttrInnerBlocks();
			},
		};
	} ),
] )( Edit );
