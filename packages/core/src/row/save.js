/**
 * Internal dependencies
 */
import Row from './components/row';

const { Component } = wp.element;
const { InnerBlocks } = wp.editor;
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
