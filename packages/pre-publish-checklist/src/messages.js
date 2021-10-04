/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

export const getWordCountMessage = ( settingWordCount, wordCount ) => {
	let msg = sprintf( __( '%d woorden' ), wordCount );

	if ( settingWordCount?.minWords && settingWordCount?.maxWords ) {
		msg = sprintf(
			__( '%1$d woorden - Minimaal %2$d en maximaal %3$d woorden' ),
			wordCount,
			settingWordCount.minWords,
			settingWordCount.maxWords
		);
	} else if ( settingWordCount?.minWords ) {
		msg = sprintf(
			__( '%1$d woorden - Minimaal %2$d woorden' ),
			wordCount,
			settingWordCount.minWords
		);
	} else if ( settingWordCount?.maxWords ) {
		msg = sprintf(
			__( '%1$d woorden - Maximaal %2$d woorden' ),
			wordCount,
			settingWordCount.maxWords
		);
	}

	return msg;
};

export const getTaxonomyMessage = ( taxonomy ) => {
	let msg = sprintf( __( '%s selecteren' ), taxonomy?.name );

	if ( taxonomy?.minSelected && taxonomy?.maxSelected ) {
		msg = sprintf(
			__( 'Minimaal %1$s en maximaal %2$s "%3$s" selecteren' ),
			taxonomy.minSelected,
			taxonomy.maxSelected,
			taxonomy.name
		);
	} else if ( taxonomy?.minSelected ) {
		msg = sprintf(
			__( 'Minimaal %1$d "%2$s" selecteren' ),
			taxonomy.minSelected,
			taxonomy.name
		);
	} else if ( taxonomy?.maxSelected ) {
		msg = sprintf(
			__( 'Maximaal %1$d "%2$s" selecteren' ),
			taxonomy.maxSelected,
			taxonomy.name
		);
	}

	return msg;
};
