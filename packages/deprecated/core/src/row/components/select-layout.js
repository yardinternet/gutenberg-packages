/**
 * External dependencies
 */
import uniqueId from 'lodash/uniqueId';
/**
 * Internal dependencies
 */
import { findLayoutByID, getPreset } from '../layout';

const { __ } = wp.i18n;

const SelectLayout = ( props ) => {
	const preset = getPreset();
	const { setAttributes } = props;

	/**
	 * Sets the layout from onClick
	 *
	 * @param {*} e - Event
	 */
	const layoutSelectOnClick = ( e ) => {
		const layoutID = e.currentTarget.getAttribute( 'data-layout-id' );
		const layout = findLayoutByID( layoutID );
		setAttributes( { layoutDesktop: layoutID, columns: layout.col } );
	};

	return (
		<div className="select-layout">
			<h3>{ __( 'Selecteer layout' ) }</h3>
			{ Object.keys( preset ).map( ( item ) =>
				preset[ item ].layouts.desktop.map( ( layout ) => (
					<button
						key={ uniqueId() }
						onClick={ layoutSelectOnClick }
						data-layout-id={ layout.id }
						className="select-layout__button"
					>
						<span
							className="select-layout__svg"
							dangerouslySetInnerHTML={ { __html: layout.image } }
						/>
					</button>
				) )
			) }
		</div>
	);
};

export default SelectLayout;
