import { parseData, withSaveDataAttributes, withFrontRender } from '../index';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

const data = {
	testid: '1',
	cars: [ 'Honda', 'Fiat' ],
	obj: {
		age: 12,
		name: 'John',
	},
};

describe( 'parseData', () => {
	test( 'should parse string, object and array data', () => {
		const expected = {
			'data-cars': '["Honda","Fiat"]',
			'data-obj': '{"age":12,"name":"John"}',
			'data-testid': '1',
		};
		expect( parseData( data ) ).toEqual( expected );
	} );

	test( 'should return emtpy object', () => {
		const expected = {};
		expect( parseData() ).toEqual( expected );
	} );
} );

describe( 'withSaveAttributes', () => {
	const FakeComponent = ( props ) => {
		return <div { ...props }></div>;
	};

	const WrappedComponent = withSaveDataAttributes( FakeComponent(), data );

	test( 'add data-attributes to wrapped component', () => {
		const tree = renderer.create( WrappedComponent );

		expect( tree ).toMatchSnapshot();
	} );

	test( 'should contain data attribute testid with value of 1', () => {
		render( WrappedComponent );
		screen.getByTestId( '1' );
	} );
} );

describe( 'withFrontRender', () => {
	const element = document.createElement( 'div' );
	const stringify = ( stringifyData ) => JSON.stringify( stringifyData );

	element.dataset.id = stringify( 12 );
	element.dataset.name = stringify( 'fake-component' );
	element.dataset.camelCase = stringify( 'camelCase' );
	element.dataset.testid = stringify( '1' );
	element.dataset.cars = stringify( [ 'Honda', 'Fiat' ] );
	element.dataset.obj = stringify( {
		name: 'John',
		details: { age: 22 },
	} );

	const FakeComponent = ( props ) => {
		return (
			<div data-testid={ props.testid }>
				<h2>{ props.title }</h2>
				<p>{ props.cars.map( ( car ) => car ) }</p>
			</div>
		);
	};

	const WrappedComponent = withFrontRender( {
		Component: FakeComponent,
		element,
	} );

	test( 'should render fakeComponent with additional props', () => {
		const tree = renderer.create( WrappedComponent );
		expect( tree ).toMatchSnapshot();
	} );

	test( 'should grab the testid data attribute', () => {
		render( WrappedComponent );
		screen.getByTestId( '1' );
	} );
} );
