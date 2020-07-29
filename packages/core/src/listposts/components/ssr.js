/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';

function SSR( props ) {
	const { attributes } = props;
	return (
		<ServerSideRender
			block="yard-blocks/list-posts"
			attributes={ attributes }
		/>
	);
}

export default SSR;
