/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { css, cx } from 'emotion';

function edit( props ) {
	const { className } = props;
	const TEMPLATE = [ [ 'yard-blocks/iconlist-item', { props } ] ];
	const ALLOWED_BLOCKS = [ 'yard-blocks/iconlist-item' ];

	const classname = classnames( 'yard-blocks-iconlist', className );
	const styles = css`
		padding-left: 0;
		list-style: none;
	`;

	return (
		<ul className={ cx( classname, styles ) }>
			<InnerBlocks
				renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				allowedBlocks={ ALLOWED_BLOCKS }
				defaultBlock={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</ul>
	);
}

export default edit;
