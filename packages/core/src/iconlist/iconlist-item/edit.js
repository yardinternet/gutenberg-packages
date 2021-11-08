/**
 * External dependencies
 */
import classnames from 'classnames';

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
	const { className, setAttributes, attributes } = props;
	const { labelText, placeholder } = attributes;

	const classname = classnames( 'yard-blocks-iconlist__item', className );
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
