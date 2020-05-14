import React from 'react';
import renderer from 'react-test-renderer';
import FileSize from '../components/filesize';
import Save from '../save';

describe( 'filesize', () => {
	test( 'component should not change', () => {
		const tree = renderer.create( <FileSize filesize="100 kb" /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'component should not change save component of core/file', () => {
		const tree = renderer
			.create(
				Save( [], { name: 'core/file' }, { yardShowFilesize: true } )
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
