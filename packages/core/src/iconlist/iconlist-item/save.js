/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Icon from './components/icon';

function save( props ) {
	const { attributes } = props;
	const { labelText } = attributes;

	return (
		<li className="yard-blocks-iconlist__item">
			<Icon { ...props } />
			<RichText.Content
				className="yard-blocks-iconlist__text"
				tagName="span"
				value={ labelText }
			/>
		</li>
	);
}

export default save;
