/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../../config/settings';
import metadata from './block.json';

export const Icon = <BlockIcon faClasses="fal fa-list-alt" />;

const { name, attributes } = metadata;

const settings = {
	title: __( 'Themalijst OpenPDC', NAMESPACE ),
	description: __( "Haal thema's op uit de OpenPDC.", NAMESPACE ),
	icon: {
		src: Icon,
	},
	attributes,
	edit: () => {
		return <ServerSideRender block="gemeenten/pdc-themelist" />;
	},
	save: () => () => null,
};

export { name, settings };
