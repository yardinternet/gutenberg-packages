/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PluginPrePublishPanel } from '@wordpress/edit-post';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSettings, getClassName } from './helpers';
import {
	checkTitle,
	checkWordCount,
	checkFeaturedImage,
	checkExcerpt,
	checkTaxonomies,
} from './validate';

const PrePublishCheckList = ( settings, customCheck = [] ) => {
	const [ errorLogs, setErrorLogs ] = useState( {} );
	const [ lockPost, setLockPost ] = useState( false );
	const [ currentSettings, setCurrentSettings ] = useState( {} );
	const [ taxonomiesStatus, setTaxonomiesStatus ] = useState( {} );

	const updateErrorLogs = ( { type, value } ) => {
		if ( lockPost ) setLockPost( ( prev ) => ! prev );
		setErrorLogs( ( currentState ) => ( {
			...currentState,
			[ type ]: { hasError: value.hasError, message: value.message },
		} ) );
	};

	const {
		currentPostType,
		isPublishSidebarOpened,
		blocks,
		title,
		featuredImageID,
		excerpt,
		taxonomies,
	} = useSelect(
		( select ) => {
			return {
				currentPostType: select( 'core/editor' ).getCurrentPostType(),
				isPublishSidebarOpened:
					select( 'core/edit-post' ).isPublishSidebarOpened(),
				blocks: select( 'core/block-editor' ).getBlocks(),
				title: select( 'core/editor' ).getEditedPostAttribute(
					'title'
				),
				featuredImageID:
					select( 'core/editor' ).getEditedPostAttribute(
						'featured_media'
					),
				excerpt:
					select( 'core/editor' ).getEditedPostAttribute( 'excerpt' ),
				taxonomies: currentSettings.taxonomies
					? currentSettings?.taxonomies.map( ( taxonomy ) => ( {
							...taxonomy,
							selected: select(
								'core/editor'
							).getEditedPostAttribute( taxonomy.key ),
					  } ) )
					: '',
			};
		},
		[ currentSettings ]
	);

	const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

	useEffect( () => {
		setCurrentSettings( getSettings( settings, currentPostType ) ?? {} );
	}, [ currentPostType ] );

	useEffect( () => {
		if ( ! lockPost ) {
			unlockPostSaving();
			return;
		}
		lockPostSaving();
	}, [ lockPost ] );

	useEffect( () => {
		checkTitle( currentSettings, title, updateErrorLogs );
		checkWordCount( currentSettings, blocks, updateErrorLogs );
		checkFeaturedImage( currentSettings, featuredImageID, updateErrorLogs );
		checkExcerpt( currentSettings, excerpt, updateErrorLogs );
		checkTaxonomies( taxonomies, setLockPost, setTaxonomiesStatus );
	}, [ currentSettings, isPublishSidebarOpened, blocks, title ] );

	useEffect( () => {
		if (
			! Object.keys( errorLogs ).length &&
			! Object.entries( taxonomiesStatus ).length &&
			! customCheck.length
		) {
			return;
		}
		let errorFound = false;

		// Check errors in errorLogs
		for ( const value of Object.values( errorLogs ) ) {
			if ( value.hasError ) errorFound = true;
		}

		// Check taxonomies errors
		for ( const value of Object.values( taxonomiesStatus ) ) {
			if ( value.hasError ) errorFound = true;
		}

		// Check errors in custom check
		customCheck.forEach( ( check ) => {
			if ( check.postType === currentPostType && check.hasError ) {
				errorFound = true;
			}
		} );

		if ( errorFound ) return setLockPost( true );
		setLockPost( false );
	}, [ errorLogs, customCheck ] );

	if ( ! currentSettings.postType ) return null;

	return (
		<PluginPrePublishPanel
			title={ __( 'Checklist' ) }
			initialOpen={ true }
			icon={ ' ' }
		>
			{ currentSettings?.title?.required && (
				<p className={ getClassName( errorLogs?.title?.hasError ) }>
					{ __( 'Titel verplicht' ) }
				</p>
			) }
			{ currentSettings?.wordCount?.required && (
				<p className={ getClassName( errorLogs?.wordCount?.hasError ) }>
					{ errorLogs?.wordCount?.message }
				</p>
			) }
			{ currentSettings?.featuredImage?.required && (
				<p
					className={ getClassName(
						errorLogs?.featuredImage?.hasError
					) }
				>
					{ __( 'Uitgelichte afbeelding verplicht' ) }
				</p>
			) }
			{ currentSettings?.excerpt?.required && (
				<p className={ getClassName( errorLogs?.excerpt?.hasError ) }>
					{ __( 'Samenvatting verplicht' ) }
				</p>
			) }
			{ customCheck.map(
				( check, key ) =>
					check.postType === currentPostType && (
						<p
							key={ key }
							className={ getClassName( check.hasError ) }
						>
							{ check.msg }
						</p>
					)
			) }
			{ Object.entries( taxonomiesStatus ).map( ( [ key, value ] ) => (
				<p key={ key } className={ getClassName( value.hasError ) }>
					{ value.msg }
				</p>
			) ) }
		</PluginPrePublishPanel>
	);
};

export function registerPrePublishChecklist( settings, customCheck ) {
	registerPlugin( 'yard-pre-publish-checklist', {
		render: () => PrePublishCheckList( settings, customCheck ),
	} );
}
