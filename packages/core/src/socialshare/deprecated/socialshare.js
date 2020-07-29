/**
 * Internal dependencies
 */
import FontAwesomeIcon from './fontAwesomeIcon';

const SocialShareWithincorrectWhatsappURL = ( props ) => {
	const { attributes } = props;
	const { type, color, twitter, facebook, linkedin, whatsapp } = attributes;
	const square = 'square';

	const twitterIcon = type === 'default' ? 'twitter' : `twitter-${ square }`;
	const facebookIcon =
		type === 'default' ? 'facebook' : `facebook-${ square }`;
	const linkedInIcon = type === 'default' ? 'linkedin-in' : `linkedin`;
	const whatsappIcon =
		type === 'default' ? 'whatsapp' : `whatsapp-${ square }`;

	return (
		<div className="yard-blocks-socialshare">
			{ twitter && (
				<FontAwesomeIcon
					color={ color }
					icon={ twitterIcon }
					url={ `https://twitter.com/intent/tweet/?text=${ blockSettings.page_title }&url=${ blockSettings.page_url }` } // eslint-disable-line
				/>
			) }
			{ facebook && (
				<FontAwesomeIcon
					color={ color }
					icon={ facebookIcon }
					url={ `https://facebook.com/sharer/sharer.php?u=${ blockSettings.page_url }` } // eslint-disable-line
				/>
			) }
			{ linkedin && (
				<FontAwesomeIcon
					color={ color }
					icon={ linkedInIcon }
					url={ `https://www.linkedin.com/shareArticle?mini=true&title=${ blockSettings.page_title }&url=${ blockSettings.page_url }` } // eslint-disable-line
				/>
			) }
			{ whatsapp && (
				<FontAwesomeIcon
					color={ color }
					icon={ whatsappIcon }
					url={ `whatsapp://send?text=${ blockSettings.page_title }&${ blockSettings.page_url }` } // eslint-disable-line
				/>
			) }
		</div>
	);
};

export default SocialShareWithincorrectWhatsappURL;
