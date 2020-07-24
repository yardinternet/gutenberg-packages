import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
/**
 * Internal dependencies
 */
import Row from '../components/row';
import { extractDefaultValues } from '../../../Utils/test-utils';
import { attributes } from '../settings';
import { backgroundAttributes } from '../../shared/background-image-control/attributes';

jest.mock( '../layout/index', () => ( {
	getClassesByLayoutID: jest.fn().mockReturnValue( 'col-md-3' ),
} ) );

describe( 'basic tests', () => {
	test( 'should render component test with default props', () => {
		const props = {
			attributes: extractDefaultValues( attributes ),
		};

		const tree = renderer.create( <Row { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render component test with additional background props', () => {
		const props = {
			attributes: {
				...extractDefaultValues( attributes ),
				...extractDefaultValues( backgroundAttributes ),
			},
		};

		const tree = renderer.create( <Row { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );

describe( 'background properties', () => {
	test( 'should render inline backgroundColor:red and bgClass should be empty', () => {
		const props = {
			attributes: { ...extractDefaultValues( attributes ), ...{ bgColor: 'red' } },
		};

		const tree = renderer.create( <Row { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render backgroundClass bg-primary and inline style backgroundColor should not be set', () => {
		const props = {
			attributes: { ...extractDefaultValues( attributes ), ...{ bgColor: '#0293b0' } },
		};

		const tree = renderer.create( <Row { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
