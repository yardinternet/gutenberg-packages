/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Icon from './components/icon';

const Edit = ( props ) => {
	const { setAttributes, attributes } = props;
	const { labelText, placeholder } = attributes;

	const blockProps = useBlockProps( {
		className: 'yard-blocks-iconlist__item',
		style: { position: 'relative', display: 'flex', alignItems: 'center' },
	} );

	return (
		<>
			<Inspector { ...props } />
			<li { ...blockProps }>
				<Icon { ...props } />
				<RichText
					tagName="span"
					placeholder={ placeholder }
					value={ labelText }
					onChange={ ( value ) =>
						setAttributes( { labelText: value } )
					}
				/>
			</li>
		</>
	);
};

export default Edit;
