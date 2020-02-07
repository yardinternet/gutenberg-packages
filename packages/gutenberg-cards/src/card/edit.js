/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Placeholder, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TEMPLATE } from './templates';
import { getTemplate } from './helpers';
import Card from '../components/card';

function edit({ attributes, className, setAttributes }) {
	const { selectedTemplate } = attributes;
	const template = getTemplate(selectedTemplate);

	const onChange = (value) => {
		setAttributes({
			selectedTemplate: value,
		});
	};

	const options = [
		{
			value: null,
			label: __('Selecteer template'),
			disabled: false,
		},
	].concat(
		TEMPLATE.map((item) => ({
			label: item.label,
			value: item.value,
		}))
	);

	return selectedTemplate && template ? (
		<Card
			{ ...{
				className: classnames(className, template.cardClass),
				innerCardClass: template.innerCardClass,
			} }
		>
			<InnerBlocks
				allowedBlocks={ 'core/paragraph' }
				templateLock={ false }
				template={ template.innerBlocks }
			/>
		</Card>
	) : (
		<Placeholder icon="layout" label={ __( 'Card' ) }>
			<SelectControl options={ options } value={ selectedTemplate } onChange={ onChange } />
		</Placeholder>
	);
}

export default edit;
