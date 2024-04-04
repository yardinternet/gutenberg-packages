/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import { coreButtonIcon } from '../../../config';

export default createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== coreButtonIcon.block ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes } = props;
		const { yardButtonIcon, yardButtonIconColor, yardShowButtonIcon } =
			attributes;

		return (
			<>
				{ yardShowButtonIcon ? (
					<div className="yard-blocks-button--with-icon">
						<i
							className={ `yard-blocks-button-icon ${ yardButtonIcon }` }
							style={ { color: yardButtonIconColor } }
							aria-hidden="true"
						></i>
						<BlockEdit { ...props } />
						<Inspector { ...props } />
					</div>
				) : (
					<>
						<BlockEdit { ...props } />
						<Inspector { ...props } />
					</>
				) }
			</>
		);
	};
} );
