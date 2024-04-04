/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Row from './components/row';

class RowSave extends Component {
	render() {
		const { className } = this.props;

		return (
			<Row className={ className } { ...this.props }>
				<InnerBlocks.Content />
			</Row>
		);
	}
}

export default RowSave;
