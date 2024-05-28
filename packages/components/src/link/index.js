/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Popover, Icon, Tooltip } from '@wordpress/components';
import {
	__experimentalLinkControl as LinkControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	RichText,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { useOnClickOutside } from '@yardinternet/gutenberg-hooks';

/**
 * Internal dependencies
 */
import './editor.scss';

export const Link = ( props ) => {
	const {
		link = {
			url: '',
			title: '',
			opensInNewTab: false,
		},
		onLinkChange,
		onLinkRemove,
		onTextChange,
		placeholder = 'Vul de link en tekst in...',
		settings = [
			{
				id: 'opensInNewTab',
				title: __( 'Open in new tab' ),
			},
		],
		suggestionsQuery,
		...rest
	} = props;
	const { url, title } = link;

	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
	const [ isValidLink, setIsValidLink ] = useState( false );

	const openPopover = () => setIsPopoverOpen( true );
	const closePopover = () => setIsPopoverOpen( false );

	const linkRef = useRef();
	const popoverRef = useOnClickOutside( closePopover );

	useEffect( () => {
		setIsValidLink( !! url && !! title );
	}, [ url, title ] );

	return (
		<div className="yard-component-link">
			<RichText
				__unstablePastePlainText
				allowedFormats={ [] }
				aria-label={ __( 'Link tekst' ) }
				className="yard-component-link__rich-text"
				onChange={ ( value ) => {
					openPopover();
					onTextChange( value );
				} }
				onClick={ openPopover }
				placeholder={ placeholder }
				ref={ linkRef }
				tagName="a"
				value={ title }
				{ ...rest }
			/>

			{ ! isValidLink && (
				<Tooltip
					text={ __( 'Link en/of tekst is nog niet toegevoegd' ) }
				>
					<span>
						<Icon icon="warning" />
					</span>
				</Tooltip>
			) }

			{ isPopoverOpen && (
				<Popover
					anchor={ linkRef.current }
					className="yard-component-link__popover-link-control"
					focusOnMount={ false }
					onClose={ closePopover }
					ref={ popoverRef }
				>
					<LinkControl
						className="yard-component-link__link-control"
						hasTextControl
						onChange={ onLinkChange }
						onRemove={ onLinkRemove }
						settings={ settings }
						suggestionsQuery={ suggestionsQuery }
						value={ link }
					/>
				</Popover>
			) }
		</div>
	);
};
