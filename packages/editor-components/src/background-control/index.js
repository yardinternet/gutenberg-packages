/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';

import TabGeneral from './tabs/tab-general';
import TabAdvanced from './tabs/tab-advanced';

const BackgroundControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const { bgImgUrl } = attributes;

	const tabImageUpload = [
		{
			name: `background`,
			title: 'Algemeen',
			className: 'tabpanel__btn',
		},
	];

	const tabImageAdvanced = [
		{
			name: `background-advanced`,
			title: 'Gevanceerd',
			className: 'tabpanel__btn',
		},
	];

	return (
		<>
			<TabPanel
				className="tab-panel--layout"
				activeClass="active-tab"
				tabs={ [
					...tabImageUpload,
					...( bgImgUrl ? tabImageAdvanced : [] ),
				] }
			>
				{ ( tab ) => {
					switch ( tab.name ) {
						case `background`:
							return (
								<TabGeneral
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							);

						case `background-advanced`:
							return bgImgUrl ? (
								<TabAdvanced
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							) : null;

						default:
							throw new Error( 'no valid tab' );
					}
				} }
			</TabPanel>
		</>
	);
};

export default BackgroundControl;
