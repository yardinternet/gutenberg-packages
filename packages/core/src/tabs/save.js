/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function save( { attributes } ) {
	const { defaultTab, defaultTabEnabled, innerblocks } = attributes;

	const activeTab = () => {
		if ( ! defaultTabEnabled || ! defaultTab ) return 0;

		return defaultTab - 1;
	};

	return (
		<div id="tab-container">
			<ul className="nav nav-tabs" role="tablist">
				{ innerblocks.map( ( block, i ) => (
					<li
						key={ block.clientId }
						role="presentation"
						className="nav-item"
					>
						<button
							className={ classnames( 'nav-link', {
								active: i === activeTab(),
							} ) }
							data-target={ `#tab-panel-${ block.attributes.id }` }
							role="tab"
							data-toggle="tab"
						>
							{ block.attributes.title }
						</button>
					</li>
				) ) }
			</ul>
			<div className="tab-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default save;
