/**
 * WordPress dependencies
 */
import { createContext, useState, Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { InnerBlocks, BlockControls, PlainText } from '@wordpress/block-editor';
import { Toolbar, IconButton, ButtonGroup } from '@wordpress/components';
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
	const { innerblocks } = attributes;

	if ( ! innerblocks.length ) {
		setAttributes( {
			innerblocks: innerBlocks,
		} );
	}

	const TEMPLATE = [
		[
			'yard-blocks/tabs-tab',
			{ title: 'Titel', id: 'tab-1' },
			[ [ 'core/paragraph', { content: '' } ] ],
		],
	];

	const onTabClick = ( id ) => {
		setActiveTab( id );
	};

	return (
		<Fragment>
			<BlockControls>
				<Toolbar>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Tab toevoegen' ) }
						icon="plus"
						onClick={ () => addTab( { onTabClick } ) }
					/>
				</Toolbar>
			</BlockControls>
			<MyContext.Provider value={ { activeTab } }>
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
												label={ __( 'Dupliceer tab' ) }
												onClick={ () =>
													duplicateTab( {
														clientId:
															props.clientId,
													} )
												}
											/>
											<IconButton
												icon="no"
												label={ __( 'Verwijder tab' ) }
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
					{ id: 'x', title: 'Titel' },
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
					{ id: 'x', title: 'Titel' },
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
