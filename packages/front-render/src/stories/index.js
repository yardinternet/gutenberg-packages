import { withA11y } from '@storybook/addon-a11y';
import { withFrontRender } from '../';

export default {
	title: 'Front-Render/Components',
	decorators: [ withA11y ],
};

const FrontendComponent = ( props ) => {
	return (
		<div>
			Name: { props.name } CamelCase: { props.camelCase }
		</div>
	);
};

const element = document.createElement( 'div' );
element.dataset.name = JSON.stringify( 'Hello World' );
element.dataset.camelCase = JSON.stringify( 'CamelCase' );

export const Example = () => {
	return withFrontRender( { Component: FrontendComponent, element } );
};
