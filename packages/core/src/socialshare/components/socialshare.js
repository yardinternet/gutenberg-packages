/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import FontAwesomeWrapper from './fontawesome-wrapper';

function SocialShare( { attributes, view } ) {
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

	const ariaLabelMsg = ( platform ) => `deel via ${ platform }`;

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
			ariaLabel: ariaLabelMsg( 'Twitter' ),
			url: `https://twitter.com/intent/tweet/?text=${ blockSettings.page_title }&url=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: facebook,
			font: 'fab',
			icon: 'facebook-f',
			ariaLabel: ariaLabelMsg( 'Facebook' ),
			url: `https://facebook.com/sharer/sharer.php?u=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: linkedin,
			font: 'fab',
			icon: 'linkedin-in',
			ariaLabel: ariaLabelMsg( 'LinkedIn' ),
			url: `https://www.linkedin.com/shareArticle?mini=true&title=${ blockSettings.page_title }&url=${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: whatsapp,
			font: 'fab',
			icon: 'whatsapp',
			ariaLabel: ariaLabelMsg( 'Whatsapp' ),
			url: `https://api.whatsapp.com/send?text=${ blockSettings.page_title }%20${ blockSettings.page_url }`, // eslint-disable-line
			externalLink: true,
		},
		{
			...iconDefaults,
			id: print,
			font: 'fal',
			icon: 'print',
			ariaLabel: 'Print pagina',
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

export default SocialShare;
