/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';

export default ( props ) => {
	const { attributes } = props;

	return (
		<>
			<ServerSideRender
				block="gemeenten/servicepoints"
				attributes={ attributes }
			/>
		</>
	);
};
