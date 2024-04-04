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

const icon = 'far fa-crop-alt';
const { name, attributes } = metadata;

const settings = {
	title: __( 'Iframe' ),
	description: __(
		'Laadt een iframe in aan de hand van de URL die opgegeven is bij de instellingen.'
	),
	attributes,
	edit,
	save: ( props ) => {
		return <Iframe { ...props } />;
	},
};

export { icon, name, settings };
