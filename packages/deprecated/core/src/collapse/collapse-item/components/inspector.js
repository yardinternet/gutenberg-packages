/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	ExternalLink,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( {
	showOpen = false,
	setShowOpen = () => {},
	isAccordion = true,
	hasSubtitle = false,
	setHasSubtitle = () => {},
	setIsAccordion = () => {},
	anchorName = '',
	setAnchorName = () => {},
} ) {
	const showCustomAnchor = applyFilters(
		'yard-blocks.collapseItem.showCustomAnchor',
		false
	);

	const showHasSubtitleToggle = applyFilters(
		'yard-blocks.collapseItem.showHasSubtitleToggle',
		false
	);

	const sanatizeAnchorName = ( value ) => {
		const sanitizedValue = value
			.toLowerCase()
			.replace( /[^a-z\s-]/g, '' ) // Remove invalid characters
			.replace( /\s+/g, '-' ) // Replace spaces with hyphens
			.replace( /-+/g, '-' ) // Replace multiple hyphens with a single hyphen
			.replace( /^-/, '' ); // Remove leading hyphen
		setAnchorName( sanitizedValue );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<ToggleControl
					label={ __( 'Toon standaard open' ) }
					checked={ showOpen }
					onChange={ setShowOpen }
				/>
				<ToggleControl
					label={ __( 'Sluit na klik op ander item' ) }
					checked={ isAccordion }
					onChange={ setIsAccordion }
				/>
				{ showHasSubtitleToggle && (
					<ToggleControl
						label={ __( 'Heeft subtitel' ) }
						checked={ hasSubtitle }
						onChange={ setHasSubtitle }
					/>
				)}
			</PanelBody>
			{ showCustomAnchor && (
				<PanelBody title={ __( 'HTML Anker' ) }>
					<TextControl
						label={ __( 'Handmatige naam' ) }
						value={ anchorName }
						onChange={ sanatizeAnchorName }
						help={
							<>
								{ __(
									'Typ één of twee woorden — zonder spaties — om een uniek webadres te maken voor dit blok, genaamd een “anker.” Daarna kun je direct naar deze sectie op je pagina linken.'
								) }
								<ExternalLink
									href={ __(
										'https://wordpress.org/documentation/article/page-jumps/'
									) }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'Meer informatie over ankers' ) }
								</ExternalLink>
							</>
						}
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);
}

export default Inspector;
