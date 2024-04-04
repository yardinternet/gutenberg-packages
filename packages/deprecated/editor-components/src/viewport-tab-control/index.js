/**
 * WordPress dependencies
 */
import { TabPanel, Slot } from '@wordpress/components';

function ViewportTabControl( props ) {
	const { unique } = props;

	const tabs = [
		{
			name: `mobile-${ unique }`,
			title: '',
			className: 'tabpanel__btn  tabpanel__btn--mobile',
		},
		{
			name: `tablet-${ unique }`,
			title: '',
			className: 'tabpanel__btn tabpanel__btn--tablet',
		},
		{
			name: `desktop-${ unique }`,
			title: '',
			className: 'tabpanel__btn tabpanel__btn--desktop',
		},
	];

	return (
		<TabPanel
			className="tab-panel--layout"
			activeClass="active-tab"
			tabs={ tabs }
		>
			{ ( tab ) => {
				switch ( tab.name ) {
					case `desktop-${ unique }`:
						return <Slot name={ `viewport.desktop-${ unique }` } />;

					case `tablet-${ unique }`:
						return <Slot name={ `viewport.tablet-${ unique }` } />;

					case `mobile-${ unique }`:
						return <Slot name={ `viewport.mobile-${ unique }` } />;

					default:
						throw new Error( 'no valid tab' );
				}
			} }
		</TabPanel>
	);
}

export default ViewportTabControl;
