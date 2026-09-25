/**
 * Internal dependencies
 */
import ListPostsEdit from '../edit';

jest.mock( '@yardinternet/gutenberg-editor-components', () => ( {} ), {
	virtual: true,
} );
jest.mock( '../components/inspector', () => () => null );
jest.mock( '../components/ssr', () => () => null );
jest.mock( '../components/select-posttype-control', () => () => null );

global.blockSettings = {};

describe( 'external taxonomies', () => {
	test( 'are fetched once when the result is empty', () => {
		const props = {
			attributes: { isMultipleSourcesEnabled: true },
			setAttributes: jest.fn(),
		};
		const edit = new ListPostsEdit( props );
		edit.getExternalTaxonomies = jest.fn();
		edit.setState = ( state ) => {
			edit.state = { ...edit.state, ...state };
		};

		// Each empty fetch result triggers a new update cycle.
		for ( let i = 0; i < 5; i++ ) {
			edit.setState( { externalTaxonomies: [] } );
			edit.componentDidUpdate( props );
		}

		expect( edit.getExternalTaxonomies ).toHaveBeenCalledTimes( 1 );
	} );
} );
