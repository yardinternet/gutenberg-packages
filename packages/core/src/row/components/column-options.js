/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { getLayoutOptionsByColAndLayout } from '../layout';

const ColumnOptions = ( { columns, layout, selected, setLayout } ) => {
	const onClick = ( e ) => {
		setLayout( layout, e.currentTarget.getAttribute( 'data-layout-id' ) );
	};

	const getColumnOptions = () => {
		return getLayoutOptionsByColAndLayout(
			columns,
			layout.replace( 'layout', '' ).toLowerCase()
		).map( ( layoutItem ) => (
			<button
				key={ layoutItem.id }
				onClick={ onClick }
				data-layout-id={ layoutItem.id }
				className={ classNames(
					'column-option__btn',
					selected === layoutItem.id ? 'active' : ''
				) }
			>
				<span
					className="column-option__svg"
					dangerouslySetInnerHTML={ { __html: layoutItem.image } }
				/>
			</button>
		) );
	};

	return <div>{ getColumnOptions() }</div>;
};

export default ColumnOptions;
