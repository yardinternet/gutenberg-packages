/**
 * Internal dependencies
 */
import metadata from './block.json';
import IconDeprecated from './components/icon-deprecated';

const { attributes } = metadata;

const deprecated = [
	// since 0.2.3
	{
		attributes,
		save( props ) {
			return <IconDeprecated { ...props } />;
		},
	},
];

export default deprecated;
