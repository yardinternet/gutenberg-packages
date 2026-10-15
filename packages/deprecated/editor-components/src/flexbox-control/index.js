/**
 * WordPress dependencies
 */
import { PanelBody, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
					style={ { display: 'flex', flexWrap: 'wrap' } }
					aria-label={ __( 'Select Layout' ) }
				>
					{ options.map( ( option ) => (
						<Tooltip key={ option.value } text={ option.label }>
							<Button
								__next40pxDefaultSize
								style={ {
									height: styleOptions.height,
									flexBasis: '33.3%',
									margin: '0 -1px -1px 0',
								} }
								onClick={ () =>
									onClickFlexControl( option.value )
								}
								variant={
									option.value === value
										? 'primary'
										: 'secondary'
								}
							/>
						</Tooltip>
					) ) }
				</ButtonGroup>
				{ !! value.length && (
					<Button
						__next40pxDefaultSize
						variant="tertiary"
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
