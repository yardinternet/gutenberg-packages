/**
 * WordPress dependencies
 */
import {
	createBlock,
	registerBlockType,
	serialize,
	unregisterBlockType,
} from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { withV1Save } from '../';

// @wordpress/block-editor doesn't load in jest; useBlockProps.save is this exact function.
jest.mock( '@wordpress/block-editor', () => {
	const { __unstableGetBlockProps } = require( '@wordpress/blocks' );
	const useBlockProps = () => ( {} );
	useBlockProps.save = __unstableGetBlockProps;
	return { useBlockProps };
} );

class ClassSave extends Component {
	render() {
		return <div className="bar">class</div>;
	}
}

const saves = {
	function: ( { attributes } ) => (
		<div className="foo" data-x={ attributes.x }>
			function
		</div>
	),
	'no-class-name': () => <section>no class</section>,
	null: () => null,
	class: ClassSave,
};

const settings = {
	title: 'Test',
	category: 'text',
	attributes: {
		x: { type: 'string' },
		className: { type: 'string' },
		anchor: { type: 'string' },
	},
};

const attributes = { x: 'y', className: 'custom is-style-z', anchor: 'a1' };

describe( 'withV1Save', () => {
	// Stand-in for the generated-class-name, custom-class-name and anchor save hooks of block-editor.
	beforeAll( () =>
		addFilter(
			'blocks.getSaveContent.extraProps',
			'test/extra-props',
			( props, blockType, blockAttributes ) => ( {
				...props,
				className: [
					props.className,
					'wp-block-test',
					blockAttributes.className,
				]
					.filter( Boolean )
					.join( ' ' ),
				id: blockAttributes.anchor,
			} )
		)
	);

	afterAll( () =>
		removeFilter( 'blocks.getSaveContent.extraProps', 'test/extra-props' )
	);

	Object.entries( saves ).forEach( ( [ key, save ] ) => {
		it( `saves the same markup as apiVersion 1 (${ key })`, () => {
			const v1Name = `test/v1-${ key }`;
			const v3Name = `test/v3-${ key }`;

			registerBlockType( v1Name, { ...settings, save } );
			registerBlockType( v3Name, {
				...settings,
				apiVersion: 3,
				save: withV1Save( save ),
			} );

			const v1 = serialize( createBlock( v1Name, attributes ) );
			const v3 = serialize( createBlock( v3Name, attributes ) );

			expect( v3.replaceAll( v3Name, v1Name ) ).toBe( v1 );
			// Registering the apiVersion 1 block logs a deprecation.
			expect( console ).toHaveWarned();

			unregisterBlockType( v1Name );
			unregisterBlockType( v3Name );
		} );
	} );
} );
