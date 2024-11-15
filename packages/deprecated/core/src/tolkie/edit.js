/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';

function Edit() {
	const blockProps = useBlockProps( {
		className: 'yard-blocks-tolkie',
	} );

	return (
		<>
			<div { ...blockProps }>
				<Placeholder
					instructions={ __(
						'De Tolkie widget zal hier worden weergegeven.'
					) }
				></Placeholder>
			</div>
		</>
	);
}

export default Edit;
