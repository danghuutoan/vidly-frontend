import React from "react";

const SelectInput = ({ name, label, items, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>

			<select {...rest} name={name} id={name} className="form-control">
				<option value="" />
				{items.map(item => (
					<option key={item._id} value={item._id}>
						{item.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default SelectInput;
