/**
 * External dependencies
 */
import { withBlockWrapper } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

const name = 'yard-blocks/breadcrumbs';
const icon = 'fas fa-chevron-right';

const settings = {
	apiVersion: 3,
	title: __( 'Broodkruimels' ),
	description: __( 'Toont het kruimelpad waar de pagina zich onder bevindt' ),
	edit: withBlockWrapper( () => {
		return <ServerSideRender block="yard-blocks/breadcrumbs" />;
	} ),

	save: () => () => null,
};

export { icon, name, settings };
