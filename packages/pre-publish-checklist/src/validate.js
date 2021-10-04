/**
 * WordPress dependencies
 */
import { count } from '@wordpress/wordcount';
import { serialize } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { getWordCountMessage, getTaxonomyMessage } from './messages';

export const checkTitle = ( currentSettings, title, updateErrorLogs ) => {
	let hasError = false;
	if ( ! currentSettings?.title?.required ) return;
	if ( ! title.length ) hasError = true;

	updateErrorLogs( {
		type: 'title',
		value: {
			hasError,
		},
	} );
};

export const checkWordCount = ( currentSettings, blocks, updateErrorLogs ) => {
	let hasError = false;
	const settingWordCount = currentSettings?.wordCount;

	if ( ! settingWordCount?.required ) return;

	const wordCount = count( serialize( blocks ), 'words' );
	if (
		wordCount < settingWordCount?.minWords ||
		wordCount > settingWordCount?.maxWords
	)
		hasError = true;

	updateErrorLogs( {
		type: 'wordCount',
		value: {
			hasError,
			message: getWordCountMessage( settingWordCount, wordCount ),
		},
	} );
};

export const checkFeaturedImage = (
	currentSettings,
	featuredImageID,
	updateErrorLogs
) => {
	let hasError = false;
	if ( ! currentSettings?.featuredImage?.required ) return;
	if ( ! featuredImageID ) hasError = true;

	updateErrorLogs( {
		type: 'featuredImage',
		value: {
			hasError,
		},
	} );
};

export const checkExcerpt = ( currentSettings, excerpt, updateErrorLogs ) => {
	let hasError = false;
	if ( ! currentSettings?.excerpt?.required ) return;
	if ( ! excerpt.length ) hasError = true;

	updateErrorLogs( {
		type: 'excerpt',
		value: {
			hasError,
		},
	} );
};

export const checkTaxonomies = (
	taxonomies,
	setLockPost,
	setTaxonomiesStatus
) => {
	if ( ! taxonomies.length ) return;
	const newTaxonomiesStatus = {};

	taxonomies.map( ( taxonomy ) => {
		if ( ! taxonomy.selected ) return null;
		let hasError = false;
		const msg = getTaxonomyMessage( taxonomy );

		if (
			taxonomy.selected.length < taxonomy?.minSelected ||
			taxonomy.selected.length > taxonomy?.maxSelected
		) {
			setLockPost( true );
			hasError = true;
		}

		return Object.assign( newTaxonomiesStatus, {
			[ taxonomy.key ]: {
				hasError,
				msg,
			},
		} );
	} );

	setTaxonomiesStatus( newTaxonomiesStatus );
};
