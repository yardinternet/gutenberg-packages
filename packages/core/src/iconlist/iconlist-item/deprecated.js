/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Icon from './components/icon';

const deprecated = [
	// Before the iconSize attribute was changed to "type": "string"
	{
		attributes: {
			icon: {
				type: 'string',
				default: 'fas fa-envelope',
			},
			iconColor: {
				type: 'string',
				default: '',
			},
			iconSize: {
				type: 'number',
				default: 18,
			},
			labelText: {
				type: 'string',
				default: '',
			},
			placeholder: {
				type: 'string',
				default: 'Begin met schrijven',
			},
			altText: {
				type: 'string',
				default: '',
			},
		},
		save( props ) {
			const { attributes } = props;
			const { labelText, altText } = attributes;

			return (
				<li className="yard-blocks-iconlist__item">
					<Icon { ...props } />
					{ altText && <span className="sr-only">{ altText }</span> }
					<RichText.Content
						className="yard-blocks-iconlist__text"
						tagName="span"
						value={ labelText }
					/>
				</li>
			);
		},
	},
];

export default deprecated;
