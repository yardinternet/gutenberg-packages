/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { css, cx } from 'emotion';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Icon from './components/icon';

function edit( props ) {
	const { setAttributes, attributes } = props;
	const { labelText, placeholder } = attributes;

	const classname = 'yard-blocks-icon-list__item';
	const styles = css`
		position: relative;
		display: flex;
		align-items: center;
	`;

	return (
		<>
			<Inspector { ...props } />
			<li className={ cx( classname, styles ) }>
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
}

export default edit;
