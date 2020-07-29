/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import metadata from './block.json';

const { attributes } = metadata;

const deprecated = [
	{
		attributes,
		save: ( props ) => {
			return (
				<div id="tab-container">
					<ul className="nav nav-tabs" role="tablist">
						{ props.attributes.innerblocks.map( ( block, i ) => (
							<li
								key={ block.clientId }
								role="presentation"
								className="nav-item"
							>
								<a // eslint-disable-line
									className={ classnames( 'nav-link', {
										active: i === 0,
									} ) }
									data-target={ `#tab-panel-${ block.attributes.id }` }
									rel="noopener noreferrer"
									role="tab"
									data-toggle="tab"
								>
									{ block.attributes.title }
								</a>
							</li>
						) ) }
					</ul>
					<div className="tab-content">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
