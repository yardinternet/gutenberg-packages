/**
 * WordPress dependencies
 */
import {
	createContext,
	useEffect,
	useState,
	Fragment,
	useCallback,
} from '@wordpress/element';
import { withSelect, withDispatch, useSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PlainText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	ButtonGroup,
	Button,
	ToolbarButton,
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
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
	clientId,
	setAttributes,
	innerBlocks = [],
	updateTitle,
	addTab,
	removeTab,
	duplicateTab,
} ) {
	const [ activeTab, setActiveTab ] = useState( 'tab-default-' + clientId );
	const { defaultTab, defaultTabEnabled, innerblocks } = attributes;

	const blockProps = useBlockProps( {
		className: 'yard-blocks-tabs',
	} );

	const { getClientIdsOfDescendants, getBlockAttributes } = useSelect(
		( select ) => ( {
			getClientIdsOfDescendants:
				select( 'core/block-editor' ).getClientIdsOfDescendants(
					clientId
				),
			getBlockAttributes:
				select( 'core/block-editor' ).getBlockAttributes,
		} )
	);

	const clientIdExist = useCallback(
		( idToCheck ) => {
			return getClientIdsOfDescendants?.some( ( _clientId ) => {
				const { id: _id } = getBlockAttributes( _clientId );
				return idToCheck === _id;
			} );
		},
		[ getClientIdsOfDescendants, getBlockAttributes ]
	);

	useEffect( () => {
		if ( ! defaultTab || defaultTab === 'tab-1' ) {
			setAttributes( { defaultTab: 'tab-default-' + clientId } );
		}
	}, [] );

	useEffect( () => {
		setAttributes( {
			innerblocks: innerBlocks,
		} );
	}, [ innerblocks, innerBlocks ] );

	useEffect( () => {
		const defaultTabExist = clientIdExist( defaultTab );

		if ( defaultTabEnabled && defaultTabExist ) {
			setActiveTab( defaultTab );
		} else if ( innerblocks.length > 0 ) {
			setActiveTab( innerblocks[ 0 ].attributes.id );
		}
	}, [ defaultTabEnabled, defaultTab, innerblocks[ 0 ]?.attributes?.id ] );

	const TEMPLATE = [
		[
			'yard-blocks/tabs-tab',
			{
				title: 'Titel',
				id: 'tab-default-' + clientId,
				defaultTab: activeTab,
			},
			[ [ 'core/paragraph', { content: '' } ] ],
		],
	];

	const onTabClick = ( id ) => {
		setActiveTab( id );
	};

	useEffect( () => {
		if ( ! defaultTabEnabled && innerblocks.length > 0 ) {
			setAttributes( { defaultTab: innerblocks[ 0 ].attributes.id } );
		}
	}, [ defaultTabEnabled, innerblocks ] );

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						className="components-toolbar__control"
						label={ __( 'Tabblad toevoegen' ) }
						icon="plus"
						onClick={ () => addTab( { onTabClick } ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Instellingen' ) }>
					<ToggleControl
						label={ __( 'Actief tabblad opgeven' ) }
						help={ __( 'Standaard te openen tabblad' ) }
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
							options={ innerBlocks?.map( ( props ) => ( {
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
				<div { ...blockProps }>
					<ul className="nav nav-tabs" role="tablist">
						{ innerBlocks?.map( ( props ) => {
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
											<Button
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
											<Button
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
		const { getBlocks, getBlockRootClientId } =
			registry.select( 'core/block-editor' );

		const { replaceInnerBlocks, updateBlockAttributes } =
			dispatch( 'core/block-editor' );

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
						defaultTab: 'tab-default-' + clientId,
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
						defaultTab: 'tab-default-' + clientId,
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
