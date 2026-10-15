/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName, hasBlockSupport } from '@wordpress/blocks';
import { cloneElement, Component } from '@wordpress/element';

/*
 * Shims that let apiVersion 1 edit and save functions run as apiVersion 3 with identical output.
 * apiVersion 3 is required for the iframed editor; changing saved markup would invalidate existing content.
 */

/**
 * Wraps an apiVersion 1 edit in the block wrapper and passes className the way apiVersion 1 did.
 *
 * The apiVersion 1 wrapper carried neither the default nor the custom class name; the edit got them as `className`.
 *
 * @param {Function} Edit apiVersion 1 edit component
 * @return {Function} apiVersion 3 edit component
 */
export const withBlockWrapper = ( Edit ) => ( props ) => {
	const { name, attributes } = props;
	const blockProps = useBlockProps();
	const defaultClassName = getBlockDefaultClassName( name );
	const v1Only = [
		defaultClassName,
		...( attributes.className || '' ).split( ' ' ),
	].filter( Boolean );

	const className = classnames(
		hasBlockSupport( name, 'className', true ) && defaultClassName,
		attributes.className
	);

	return (
		<div
			{ ...blockProps }
			className={ blockProps.className
				.split( ' ' )
				.filter( ( cls ) => ! v1Only.includes( cls ) )
				.join( ' ' ) }
		>
			<Edit { ...props } className={ className || undefined } />
		</div>
	);
};

/**
 * Applies the save props filter to the root element, as the serializer does for apiVersion 1 only.
 *
 * @param {Function} Save apiVersion 1 save function
 * @return {Function} apiVersion 3 save function
 */
export const withV1Save = ( Save ) => ( props ) => {
	// Class saves are instantiated the same way the serializer does it.
	const element =
		Save.prototype instanceof Component
			? new Save( props ).render()
			: Save( props );

	if ( element === null || typeof element !== 'object' ) {
		return element;
	}

	return cloneElement( element, useBlockProps.save( element.props ) );
};
