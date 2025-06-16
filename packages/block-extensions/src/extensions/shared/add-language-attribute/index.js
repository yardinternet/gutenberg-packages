/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { cloneElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import edit from './edit';
import { languageSelectOptions } from '../../../util/i18n';

const ADD_LANGUAGE_ATTRIBUTE_NAMESPACE = 'yard.add-language-attribute';

export default function addLanguageAttribute( blocks = [], options = {} ) {
	if ( ! Array.isArray( blocks ) ) {
		blocks = [ blocks ];
	}

	const defaults = {
		languages: languageSelectOptions,
	};

	const config = {
		...defaults,
		...options,
	};

	blocks.forEach( ( block ) => {
		registerBlockType( block );
		registerBlockEdit( block, config );
		registerSaveContent( block );
	} );
}

function registerBlockType( block ) {
	addFilter(
		'blocks.registerBlockType',
		`${ ADD_LANGUAGE_ATTRIBUTE_NAMESPACE }.${ block }`,
		( settings, name ) => {
			if ( name !== block ) {
				return settings;
			}

			const originalSave = settings.save;

			return {
				...settings,
				attributes: {
					...settings.attributes,
					lang: {
						type: 'string',
						default: '',
					},
				},
				save: ( props ) => {
					const { attributes } = props;
					const { lang } = attributes;

					const element = originalSave( props );

					if ( lang ) {
						return cloneElement( element, { lang } );
					}

					return element;
				},
				deprecated: [
					{
						attributes: {
							...settings.attributes,
							lang: {
								type: 'string',
								default: '',
							},
						},
						save: originalSave,
					},
					...( settings.deprecated || [] ),
				],
			};
		}
	);
}

function registerBlockEdit( block, config ) {
	addFilter(
		'editor.BlockEdit',
		`${ ADD_LANGUAGE_ATTRIBUTE_NAMESPACE }.${ block }`,
		edit( block, config )
	);
}

function registerSaveContent( block ) {
	addFilter(
		'blocks.getSaveContent.extraProps',
		`${ ADD_LANGUAGE_ATTRIBUTE_NAMESPACE }.${ block }`,
		( props, _, attributes ) => {
			const lang = attributes?.lang || '';

			if ( lang ) {
				return {
					...props,
					lang,
				};
			}

			return props;
		}
	);
}
