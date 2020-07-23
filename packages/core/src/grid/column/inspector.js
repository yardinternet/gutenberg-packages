/**
 * External dependencies
 */
import {
	BackgroundControl,
	SpacingControl,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ColumnSize from '../components/column-size';

function Inspector( { attributes, setAttributes } ) {
	const { colClassLg, colClass, colClassSm, colClassXs } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<ColumnSize
					label="Column large"
					beforeIcon="desktop"
					attribute="colClassLg"
					value={ colClassLg }
					setAttributes={ setAttributes }
				/>
				<ColumnSize
					label="Column medium"
					beforeIcon="laptop"
					attribute="colClass"
					value={ colClass }
					setAttributes={ setAttributes }
				/>
				<ColumnSize
					label="Column small"
					beforeIcon="tablet"
					attribute="colClassSm"
					value={ colClassSm }
					setAttributes={ setAttributes }
				/>
				<ColumnSize
					label="Column extra small"
					beforeIcon="smartphone"
					attribute="colClassXs"
					value={ colClassXs }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
			<SpacingControl
				{ ...{ attributes, setAttributes } }
				panelLabel={ 'Margin' }
				type={ 'margin' }
			/>
			<SpacingControl
				{ ...{ attributes, setAttributes } }
				panelLabel={ 'Padding' }
				type={ 'padding' }
			/>
			<PanelBody title={ __( 'Achtergrond' ) } initialOpen={ false }>
				<BackgroundControl { ...{ setAttributes, attributes } } />
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
