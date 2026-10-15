/**
 * External dependencies
 */
import {
	withBlockWrapper,
	withV1Save,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import SocialShare from './components/socialshare';
import deprecated from './deprecated';
import edit from './edit';

const icon = 'far fa-share-alt';
const { name, attributes } = metadata;

const settings = {
	apiVersion: 3,
	title: __( 'Social media deelknoppen' ),
	description: __(
		'Plaats sociale media iconen waarmee je gemakkelijk de pagina kunt delen met anderen.'
	),
	attributes,
	edit: withBlockWrapper( edit ),
	save: withV1Save( ( props ) => {
		return <SocialShare { ...props } />;
	} ),
	deprecated,
};

export { icon, name, settings };
