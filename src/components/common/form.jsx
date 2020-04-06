import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectInput from "./selectInput";
class Form extends Component {
	state = {
		data: {},
		errors: {}
	};
	validate = () => {
		const { data } = this.state;
		const options = { abortEarly: false };
		const { error } = Joi.validate(data, this.schema, options);
		if (!error) return null;
		const errors = {};

		for (let item of error.details) errors[item.path] = item.message;

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const { name, value } = input;
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty({ name, value });
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[name] = value;
		this.setState({ data, errors });
	};

	renderButton = label => {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	};

	renderInput = (name, label, type = "text") => {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				error={errors[name]}
				name={name}
				onChange={this.handleChange}
				value={data[name]}
				label={label}
			/>
		);
	};

	renderSeletList = (name, label, items, value) => {
		console.log(value);
		const { data, errors } = this.state;
		return (
			<SelectInput
				name={name}
				error={errors[name]}
				value={data[name]}
				label={label}
				items={items}
				onChange={this.handleChange}
			/>
		);
	};
}

export default Form;
