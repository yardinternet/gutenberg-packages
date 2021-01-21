/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

const name = 'yard-blocks/breadcrumbs';
const icon = 'fas fa-chevron-right';

const settings = {
	title: __( 'Broodkruimels' ),
	description: __( 'Toont het kruimelpad waar de pagina zich onder bevindt' ),
	edit: () => {
		return <ServerSideRender block="yard-blocks/breadcrumbs" />;
	},

	save: () => () => null,
};

export { icon, name, settings };
