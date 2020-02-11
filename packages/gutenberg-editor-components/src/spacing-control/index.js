/**
 * WordPress dependencies
 */
import { PanelBody, RangeControl, Fill } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { getSpacingUtilClass } from '../helpers';
import ViewportTabControl from '../viewport-tab-control';
import {
	filterNumber,
	formatToNegativeNumber,
	getNegativeMargin,
	getMarginAttributes,
	getPaddingAttributes,
} from './helpers';

function SpacingControl( {
	setAttributes,
	attributes,
	panelLabel,
	type = 'margin',
} ) {
	const viewports = [ 'desktop', 'tablet', 'mobile' ];
	const viewportSizes = {
		desktop: 'lg',
		tablet: 'md',
	};
	const sizes = applyFilters( 'gutenberg-editor-components.spacingSize', 5 );
	const negativeMarginSize = formatToNegativeNumber( sizes );
	const shortType = type.slice( 0, 1 );

	const setControlVal = ( side, attr, attrName, viewport, size, number ) => {
		setAttributes( {
			[ attrName ]: {
				...attr,
				...{
					[ viewport ]: getSpacingUtilClass( [
						side,
						size,
						number + '',
					] ),
				},
			},
		} );
	};

	/**
	 * Creates rangeControl for each viewport and side
	 *
	 * @param {string} label Top
	 * @param {Object} attr { MarginTop: { desktop: 'mt-5' } }
	 * @param {string} attrName marginTop
	 * @param {string} viewport desktop
	 * @param {string} side mt
	 * @param {string} size lg
	 * @return { RangeControl } RangeControl
	 */
	const createControl = (
		label,
		attr,
		attrName,
		viewport,
		side,
		size = ''
	) => {
		return (
			<RangeControl
				label={ label }
				onChange={ ( number ) =>
					setControlVal(
						side,
						attr,
						attrName,
						viewport,
						size,
						number
					)
				}
				value={ filterNumber( attr[ viewport ] ) }
				min={ type === 'margin' ? negativeMarginSize : 0 }
				max={ sizes }
			/>
		);
	};

	return (
		<PanelBody title={ panelLabel } initialOpen={ false }>
			<ViewportTabControl unique={ type } />
			{ viewports.map( ( viewport ) => (
				<Fill
					key={ `${ viewport }-${ type }` }
					name={ `viewport.${ viewport }-${ type }` }
				>
					{ createControl(
						'Top',
						attributes[ `${ type }Top` ],
						`${ type }Top`,
						viewport,
						`${ shortType }t`,
						viewportSizes[ viewport ]
					) }
					{ createControl(
						'Right',
						attributes[ `${ type }Right` ],
						`${ type }Right`,
						viewport,
						`${ shortType }r`,
						viewportSizes[ viewport ]
					) }
					{ createControl(
						'Bottom',
						attributes[ `${ type }Bottom` ],
						`${ type }Bottom`,
						viewport,
						`${ shortType }b`,
						viewportSizes[ viewport ]
					) }
					{ createControl(
						'Left',
						attributes[ `${ type }Left` ],
						`${ type }Left`,
						viewport,
						`${ shortType }l`,
						viewportSizes[ viewport ]
					) }
				</Fill>
			) ) }
		</PanelBody>
	);
}

export {
	SpacingControl as default,
	getMarginAttributes,
	getPaddingAttributes,
	getNegativeMargin,
};
