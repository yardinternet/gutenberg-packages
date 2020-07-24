import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
/**
 * Internal dependencies
 */
import Column from '../components/column';
import { extractDefaultValues } from '../../../Utils/test-utils';
import { attributes } from '../settings';
import { backgroundAttributes } from '../../shared/background-image-control/attributes';

describe( 'basic tests', () => {
	test( 'should render component test with default props', () => {
		const props = {
			attributes: extractDefaultValues( attributes ),
		};

		const tree = renderer.create( <Column { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render component test with additional background props', () => {
		const props = {
			attributes: {
				...extractDefaultValues( attributes ),
				...extractDefaultValues( backgroundAttributes ),
			},
		};

		const tree = renderer.create( <Column { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render backgroundClass bg-primary and inline style backgroundColor should not be set', () => {
		const props = {
			attributes: { ...extractDefaultValues( attributes ), ...{ bgColor: '#0293b0' } },
		};

		const tree = renderer.create( <Column { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render flexbox classes when isFlex === true', () => {
		const props = {
			attributes: { ...extractDefaultValues( attributes ), ...{ isFlex: true } },
		};

		const tree = renderer.create( <Column { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
