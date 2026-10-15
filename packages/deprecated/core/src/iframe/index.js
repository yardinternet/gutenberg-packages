/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import Iframe from './components/iframe';

/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

const icon = 'far fa-crop-alt';
const { name, attributes } = metadata;

const settings = {
	apiVersion: 3,
	title: __( 'Iframe' ),
	description: __(
		'Laadt een iframe in aan de hand van de URL die opgegeven is bij de instellingen.'
	),
	attributes,
	edit: withBlockWrapper( edit ),
	save: withV1Save( ( props ) => {
		return <Iframe { ...props } />;
	} ),
};

export { icon, name, settings };
