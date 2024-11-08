/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function CustomHelp() {
	return (
		<span className="components-base-control__help">
			Typ één of twee woorden om een uniek webadres te maken voor dit
			blok, genaamd een “anker.” Daarna kun je direct naar deze sectie op
			je pagina linken.
			<a
				className="components-external-link"
				href="https://wordpress.org/documentation/article/page-jumps/"
				target="_blank"
				rel="external noreferrer noopener"
			>
				<span className="components-external-link__contents">
					Meer informatie over ankers
				</span>
				<span
					className="components-external-link__icon"
					aria-label="(opent in een nieuwe tab)"
				>
					<span>↗</span>
				</span>
			</a>
		</span>
	);
}

function Inspector( {
	showOpen = false,
	setShowOpen = () => {},
	isAccordion = true,
	setIsAccordion = () => {},
	anchorName = '',
	setAnchorName = () => {},
} ) {
	const showCustomAnchor = applyFilters(
		'yard-blocks.collapseItem.showCustomAnchor',
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
			</PanelBody>
			{ showCustomAnchor && (
				<PanelBody title={ __( 'HTML Anker' ) }>
					<TextControl
						label={ __( 'Handmatige naam' ) }
						value={ anchorName }
						onChange={ sanatizeAnchorName }
						help={ <CustomHelp /> }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);
}

export default Inspector;
