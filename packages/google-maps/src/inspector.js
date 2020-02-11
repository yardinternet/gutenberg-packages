import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { config } from '../src/config';

import List from './edit/item-list/list';

function Inspector() {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties', config.textDomain ) }>
				<List>
					<List.Item></List.Item>
					<List.Item></List.Item>
				</List>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
