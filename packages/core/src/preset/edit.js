/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { Placeholder, Spinner, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { findElementById } from './helpers';
import PreviewPreset from './components/preview-preset';

const Edit = ( { clientId } ) => {
	const [ presetCollection, setPresetCollection ] = useState( false );
	const [ patterns, setPatterns ] = useState();
	const [ presetId, setPresetId ] = useState();

	const { getBlockIndex, getBlockRootClientId } = useSelect( ( select ) => ( {
		getBlockIndex: select( 'core/block-editor' ).getBlockIndex,
		getBlockRootClientId: select( 'core/block-editor' )
			.getBlockRootClientId,
	} ) );

	const { clearSelectedBlock, insertBlocks, removeBlock } = useDispatch(
		'core/block-editor'
	);
	const { createNotice } = useDispatch( 'core/notices' );

	useEffect( () => {
		fetchPresets();
	}, [] );

	const fetchPresets = () => {
		apiFetch( { path: '/yard/blocks/v1/presets' } ).then( ( presets ) => {
			setPresetCollection( presets );

			const presetArray = presets
				.map( ( preset ) => preset.items )
				.flat();

			setPatterns(
				presetArray.map( ( preset ) => ( {
					id: preset.id,
					title: preset.label,
					content: preset.code,
				} ) )
			);
		} );
	};

	const onBlur = () => {
		// TODO for a11y
	};

	const loadPreset = ( id ) => {
		const preset = findElementById( presetCollection, parseInt( id, 10 ) );

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
						htmlFor={ `preset-${ clientId }` }
					>
						{ __( 'Selecteer een patroon:' ) }
					</label>
					<select
						id={ `preset-${ clientId }` }
						onBlur={ onBlur }
						onChange={ ( e ) =>
							setPresetId( e.currentTarget.value )
						}
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
					{ presetId && (
						<>
							<div className="w-100 mb-4">
								<PreviewPreset
									presetId={ presetId }
									patterns={ patterns }
								/>
							</div>
							<Button
								isPrimary
								onClick={ () => loadPreset( presetId ) }
							>
								{ __( 'Patroon inladen' ) }
							</Button>
						</>
					) }
				</>
			) : (
				<Spinner />
			) }
		</Placeholder>
	);
};

export default Edit;
