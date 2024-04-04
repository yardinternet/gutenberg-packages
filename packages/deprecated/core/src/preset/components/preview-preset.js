/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { parse } from '@wordpress/blocks';
import { BlockPreview } from '@wordpress/block-editor';
import { Placeholder, Spinner } from '@wordpress/components';

const PreviewPreset = ( { presetId, patterns } ) => {
	const [ patternId, setPatternId ] = useState();

	useEffect( () => {
		setPatternId(
			patterns.find( ( { id } ) => id === parseInt( presetId ) )
		);
	}, [ presetId ] );

	return (
		<>
			{ patternId ? (
				<>
					<p className="w-100 mt-4 mb-1">
						{ __( 'Voorbeeld van het geselecteerde patroon:' ) }
					</p>
					<div className="yard-blocks-preset-preview | w-50">
						<Placeholder>
							<BlockPreview
								blocks={ parse( patternId.content ) }
								viewportWidth={ 1000 }
							/>
						</Placeholder>
					</div>
				</>
			) : (
				<Spinner />
			) }
		</>
	);
};

export default PreviewPreset;
