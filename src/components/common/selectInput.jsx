import React from "react";

const SelectInput = ({ name, label, items, onChange, error }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>

			<select
				onChange={onChange}
				name={name}
				id={name}
				className="form-control"
			>
				{items.map(item => (
					<option key={item._id}>{item.name}</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default SelectInput;
