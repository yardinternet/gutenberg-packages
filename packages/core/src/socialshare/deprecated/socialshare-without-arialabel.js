/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import FontAwesomeWrapper from '../components/fontawesome-wrapper';

function SocialShareWithoutAriaLabel( { attributes, view } ) {
	const {
		type,
		bgColor,
		color,
		size,
		twitter,
		facebook,
		linkedin,
		whatsapp,
		print,
	} = attributes;

	const classes = classnames( [ size, 'yard-blocks-socialshare' ] );

	const iconDefaults = {
		type,
		bgColor,
		color,
	};

	const icons = [
		{
			...iconDefaults,
			id: twitter,
			font: 'fab',
			icon: 'twitter',
			url: `https://twitter.com/intent/tweet/?text=${ blockSettings.page_title }&url=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: facebook,
			font: 'fab',
			icon: 'facebook-f',
			url: `https://facebook.com/sharer/sharer.php?u=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: linkedin,
			font: 'fab',
			icon: 'linkedin-in',
			url: `https://www.linkedin.com/shareArticle?mini=true&title=${ blockSettings.page_title }&url=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: whatsapp,
			font: 'fab',
			icon: 'whatsapp',
			url: `https://api.whatsapp.com/send?text=${ blockSettings.page_title }&url=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: print,
			font: 'fal',
			icon: 'print',
			url: `javascript:window.print()`,
		},
	];

	return (
		<div className={ classes }>
			{ icons.map(
				( props, index ) =>
					props.id && (
						<FontAwesomeWrapper
							key={ `${ props.id }-${ index }` }
							view={ view }
							{ ...props }
						/>
					)
			) }
		</div>
	);
}

export default SocialShareWithoutAriaLabel;
