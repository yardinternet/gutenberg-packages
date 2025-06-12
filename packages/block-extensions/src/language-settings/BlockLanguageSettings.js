/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { cloneElement } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import defaultLanguages from './util/languages';

class BlockLanguageSettings {
	static namespace = 'yard.block-language-settings';
	static defaults = {
		languages: defaultLanguages,
	};

	static register( blocks = [], options = {} ) {
		if ( ! Array.isArray( blocks ) ) {
			blocks = [ blocks ];
		}

		const config = {
			...this.defaults,
			...options,
		};

		blocks.forEach( ( block ) => {
			this.registerBlockType( block, config );
			this.registerBlockEdit( block, config );
			this.registerSaveContent( block, config );
		} );
	}

	static registerBlockType( block ) {
		addFilter(
			'blocks.registerBlockType',
			`${ BlockLanguageSettings.namespace }.${ block }`,
			( settings, name ) => {
				if ( name !== block ) {
					return settings;
				}

				settings.attributes = {
					...settings.attributes,
					languageCode: {
						type: 'string',
						default: '',
					},
				};

				const originalSave = settings.save;

				settings.save = function ( props ) {
					const { attributes } = props;
					const { languageCode } = attributes;

					const element = originalSave( props );

					if ( languageCode ) {
						return cloneElement( element, {
							lang: languageCode,
						} );
					}

					return element;
				};

				settings.deprecated = [
					{
						attributes: {
							...settings.attributes,
							languageCode: {
								type: 'string',
								default: '',
							},
						},
						save: originalSave,
					},
					...( settings.deprecated || [] ),
				];

				return settings;
			}
		);
	}

	static registerBlockEdit( block, config ) {
		addFilter(
			'editor.BlockEdit',
			`${ BlockLanguageSettings.namespace }.${ block }`,
			createHigherOrderComponent( ( BlockEdit ) => {
				return ( props ) => {
					if ( props.name === block ) {
						return (
							<>
								<BlockEdit { ...props } />
								<Edit
									{ ...props }
									languages={ config.languages }
								/>
							</>
						);
					}

					return <BlockEdit { ...props } />;
				};
			} )
		);
	}

	static registerSaveContent( block ) {
		addFilter(
			'blocks.getSaveContent.extraProps',
			`${ BlockLanguageSettings.namespace }.${ block }`,
			( props, _, attributes ) => {
				const languageCode = attributes?.languageCode || '';

				if ( languageCode ) {
					return {
						...props,
						lang: languageCode,
					};
				}

				return props;
			}
		);
	}
}

export default BlockLanguageSettings;
