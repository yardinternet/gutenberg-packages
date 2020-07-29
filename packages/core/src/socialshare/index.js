/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import SocialShare from './components/socialshare';
import Inspector from './inspector';
import deprecated from './deprecated';

const icon = 'far fa-share-alt';
const { name, attributes } = metadata;

const settings = {
	title: __( 'Social share' ),
	description: __( 'Social share component' ),
	attributes,
	edit: ( props ) => {
		const { setAttributes } = props;

		return (
			<>
				<Inspector key="inspector" { ...{ setAttributes, ...props } } />
				<SocialShare view="edit" { ...props } />
			</>
		);
	},
	save: ( props ) => {
		return <SocialShare { ...props } />;
	},
	deprecated,
};

export { icon, name, settings };
