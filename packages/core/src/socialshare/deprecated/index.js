/**
 * Internal dependencies
 */
import metadata from '../block.json';

import Inspector from '../inspector';
import SocialShare from './socialshare';
import SocialShareWithoutAriaLabel from './socialshare-without-arialabel';
import SocialShareWithoutWhatsAppFix from './socialshare-without-whatsapp-fix';

const { attributes } = metadata;

const deprecated = [
	{
		attributes,

		edit: ( props ) => {
			const { setAttributes } = props;

			return (
				<>
					<Inspector
						key="inspector"
						{ ...{ setAttributes, ...props } }
					/>
					<SocialShare { ...props } />
				</>
			);
		},

		save: ( props ) => {
			return <SocialShare { ...props } />;
		},
	},
	{
		attributes,

		edit: ( props ) => {
			const { setAttributes } = props;

			return (
				<>
					<Inspector
						key="inspector"
						{ ...{ setAttributes, ...props } }
					/>
					<SocialShareWithoutAriaLabel { ...props } />
				</>
			);
		},

		save: ( props ) => {
			return <SocialShareWithoutAriaLabel { ...props } />;
		},
	},
	{
		attributes,

		edit: ( props ) => {
			const { setAttributes } = props;

			return (
				<>
					<Inspector
						key="inspector"
						{ ...{ setAttributes, ...props } }
					/>
					<SocialShareWithoutWhatsAppFix { ...props } />
				</>
			);
		},

		save: ( props ) => {
			return <SocialShareWithoutWhatsAppFix { ...props } />;
		},
	},
];

export default deprecated;
