/**
 * WordPress dependencies
 */
import { PanelBody, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { css } from 'emotion';

const OPTIONS = [
	{ value: 'flex-align-top-left', label: __( 'Links boven' ) },
	{ value: 'flex-align-top-center', label: __( 'Links midden' ) },
	{ value: 'flex-align-top-right', label: __( 'Rechts boven' ) },
	{ value: 'flex-align-center-left', label: __( 'Midden links' ) },
	{ value: 'flex-align-center-center', label: __( 'Midden midden' ) },
	{ value: 'flex-align-center-right', label: __( 'Midden rechts' ) },
	{ value: 'flex-align-bottom-left', label: __( 'Links onder' ) },
	{ value: 'flex-align-bottom-center', label: __( 'Midden onder' ) },
	{ value: 'flex-align-bottom-right', label: __( 'Rechts onder' ) },
];

function FlexboxControl( {
	value = 'top-left',
	panelLabel = 'Flexbox',
	onClick,
	options = OPTIONS,
	styleOptions = { height: '60px' },
} ) {
	const onClickFlexControl = ( val ) => onClick( val );

	return (
		<PanelBody title={ panelLabel } initialOpen={ false }>
			<div className="flex-control-buttons">
				<ButtonGroup
					className={ css`
						display: flex;
						flex-wrap: wrap;
					` }
					aria-label={ __( 'Select Layout' ) }
				>
					{ options.map( ( option ) => (
						<Tooltip key={ option.value } text={ option.label }>
							<Button
								className={ css`
									height: ${ styleOptions.height } !important;
									flex-basis: 33.3%;
									border-color: #545252 !important;
									margin-left: 0 !important;
									border-radius: unset !important;
									box-shadow: none !important;

									&:nth-child( 4 ),
									&:nth-child( 5 ),
									&:nth-child( 6 ) {
										border-top: 0 !important;
										border-bottom: 0 !important;
									}
								` }
								onClick={ () =>
									onClickFlexControl( option.value )
								}
								isSecondary
								isPrimary={ option.value === value }
							/>
						</Tooltip>
					) ) }
				</ButtonGroup>
				{ !! value.length && (
					<Button
						isTertiary
						onClick={ () => onClickFlexControl( '' ) }
					>
						Reset
					</Button>
				) }
			</div>
		</PanelBody>
	);
}

export default FlexboxControl;
