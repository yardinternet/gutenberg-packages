/**
 * External dependencies
 */
import * as Sentry from '@sentry/browser';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls } from '@wordpress/block-editor';
import {
	SelectControl,
	TextControl,
	PanelBody,
	ToggleControl,
	Spinner,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const ENDPOINT = 'yard/nav-menus';

class NavmenuEdit extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			navmenus: [],
			loaded: false,
		};
	}

	componentDidMount() {
		apiFetch( {
			path: ENDPOINT,
		} )
			.then( ( result ) => {
				const options = result.map( ( item ) => ( {
					label: item.name,
					value: item.term_id,
				} ) );
				this.setState( {
					navmenus: options,
					loaded: true,
				} );
			} )
			.catch( ( error ) => {
				Sentry.captureMessage( error );
			} );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { title, menuId, collapsed } = attributes;
		const { navmenus, loaded } = this.state;

		const renderTitle = () => {
			return (
				<TextControl
					label={ [ __( 'Titel' ) ] }
					value={ title }
					onChange={ ( newTitle ) =>
						setAttributes( { title: newTitle } )
					}
				/>
			);
		};

		const renderNavMenuSelect = () => {
			const defaultOption = [
				{ label: __( 'Selecteer menu' ), value: '' },
			];

			return (
				<SelectControl
					label="Selecteer menu:"
					value={ attributes.menuId }
					onChange={ ( newMenuId ) =>
						setAttributes( { menuId: newMenuId } )
					}
					options={ [ ...defaultOption, ...navmenus ] }
				/>
			);
		};

		return (
			<>
				<InspectorControls key="controls">
					<PanelBody title={ __( 'Instellingen' ) }>
						{ renderTitle() }
						{ loaded ? renderNavMenuSelect() : <Spinner /> }
						<ToggleControl
							label="Collapse"
							help={
								collapsed
									? __( 'Menu is ingeklapt.' )
									: __( 'Menu is uitgeklapt.' )
							}
							checked={ collapsed }
							onChange={ ( bool ) =>
								setAttributes( { collapsed: bool } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div>
					{ ! menuId ? (
						<div>
							<h4>{ __( 'Selecteer menu' ) }</h4>
							<div>
								{ renderTitle() }
								{ loaded ? renderNavMenuSelect() : <Spinner /> }
							</div>
						</div>
					) : (
						<ServerSideRender
							block="yard-blocks/navmenu"
							attributes={ attributes }
						/>
					) }
				</div>
			</>
		);
	}
}

export default NavmenuEdit;
