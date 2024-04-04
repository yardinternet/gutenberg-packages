const GroupLabel = ( data ) => (
	<div className="yard-blocks-select__group">
		<span>{ data.label }</span>
		<span>{ data.options.length }</span>
	</div>
);

export default GroupLabel;
