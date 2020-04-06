import React, { Component } from "react";

const SearchBar = ({ value, onChange }) => {
	return (
		<input
			type="text"
			className="form-control my-3"
			placeholder="Search..."
			style={{ marginBottom: 20 }}
			value={value}
			onChange={e => onChange(e.currentTarget.value)}
		/>
	);
};

export default SearchBar;
