/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Icon from './components/icon';

const Save = ( props ) => {
	const { attributes } = props;
	const { labelText, altText } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-iconlist__item',
	} );

	return (
		<li { ...blockProps }>
			<Icon { ...props } />
			{ altText && <span className="sr-only">{ altText }</span> }
			<RichText.Content
				className="yard-blocks-iconlist__text"
				tagName="span"
				value={ labelText }
			/>
		</li>
	);
};

export default Save;
