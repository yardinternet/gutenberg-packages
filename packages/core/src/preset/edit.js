/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { Placeholder, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { withDispatch } from '@wordpress/data';
import { compose, withInstanceId } from '@wordpress/compose';
import { parse } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { findElementById } from './helpers';

const Edit = ( {
	insertBlocks,
	getBlockRootClientId,
	getBlockIndex,
	removeBlock,
	createNotice,
	clientId,
	clearSelectedBlock,
	instanceId,
} ) => {
	const [ presetCollection, setPresetCollection ] = useState( false );

	useEffect( () => {
		fetchPresets();
	}, [] );

	const fetchPresets = () => {
		apiFetch( { path: '/yard/blocks/v1/presets' } ).then( ( presets ) => {
			setPresetCollection( presets );
		} );
	};

	const onBlur = () => {
		// TODO for a11y
	};

	const onChange = ( event ) => {
		const value = event.currentTarget.value;
		const preset = findElementById(
			presetCollection,
			parseInt( value, 10 )
		);

		insertBlocks(
			parse( preset.code ),
			getBlockIndex( clientId ),
			getBlockRootClientId( clientId )
		);
		removeBlock( clientId );
		clearSelectedBlock();
		createNotice( 'info', __( 'Patroon toegevoegd' ), {
			isDismissible: true,
			type: 'snackbar',
			id: 'yard-block-preset',
		} );
	};

	return (
		<Placeholder
			icon={
				<BlockIcon faClasses="fal fa-hammer" marginRight={ true } />
			}
			label={ __( 'Patroon (sjabloon)' ) }
		>
			{ presetCollection ? (
				<>
					<label
						className="d-block w-100"
						htmlFor={ `preset-${ instanceId }` }
					>
						{ __( 'Selecteer een patroon:' ) }
					</label>
					<select
						id={ `preset-${ instanceId }` }
						onBlur={ onBlur }
						onChange={ onChange }
					>
						<option defaultValue>Selecteer</option>
						{ presetCollection.map( ( group ) => (
							<optgroup key={ group.id } label={ group.label }>
								{ group.items.map( ( item ) => (
									<option key={ item.id } value={ item.id }>
										{ item.label }
									</option>
								) ) }
							</optgroup>
						) ) }
					</select>
				</>
			) : (
				<Spinner />
			) }
		</Placeholder>
	);
};

export default compose( [
	withDispatch( ( dispatch, props, registry ) => ( {
		clearSelectedBlock: dispatch( 'core/block-editor' ).clearSelectedBlock,
		insertBlocks: dispatch( 'core/block-editor' ).insertBlocks,
		removeBlock: dispatch( 'core/block-editor' ).removeBlock,
		getBlockIndex: registry.select( 'core/block-editor' ).getBlockIndex,
		getBlockRootClientId: registry.select( 'core/block-editor' )
			.getBlockRootClientId,
		createNotice: dispatch( 'core/notices' ).createNotice,
	} ) ),
	withInstanceId,
] )( Edit );
