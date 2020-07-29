/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	BlockControls,
	URLInput,
} from '@wordpress/block-editor';
import { Fragment, Component } from '@wordpress/element';
import {
	Toolbar,
	IconButton,
	Dashicon,
	PanelBody,
	Button,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

class Inspector extends Component {
	render() {
		const {
			setAttributes,
			attributes,
			togglePopover,
			removePoint,
			setFitBounds,
			fitBounds,
		} = this.props;
		const { points, url } = attributes;

		const locationPanels = points.map( ( point ) => {
			return (
				<PanelBody
					title={ point.name }
					key={ point.id }
					initialOpen={ false }
				>
					<Button
						id={ point.id }
						isTertiary
						className={ 'd-flex align-items-center' }
						onClick={ () => removePoint( point.id ) }
					>
						<Dashicon icon="trash" size="15" />
						{ __( 'Verwijder marker' ) }
					</Button>
				</PanelBody>
			);
		} );

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<IconButton
							icon={ <Dashicon icon="location" /> }
							label={ __( 'Marker toevoegen' ) }
							onClick={ () => togglePopover() }
						/>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Opties' ) }>
						<p className="yard-label">Link wrapper:</p>
						<URLInput
							value={ url }
							onChange={ ( val ) =>
								setAttributes( { url: val } )
							}
						/>
						{ points.length ? (
							<CheckboxControl
								heading="Schaal map relatief aan markers"
								label="Schaal map"
								checked={ fitBounds }
								onChange={ ( val ) => setFitBounds( val ) }
							/>
						) : null }
					</PanelBody>
					{ points.length ? (
						<Fragment>{ locationPanels }</Fragment>
					) : null }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
