import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class NewMovieForm extends Form {
	state = {
		data: {
			title: "",
			genre: "",
			numberInStock: "",
			dailyRentalRate: ""
		},
		errors: {}
	};

	schema = {
		title: Joi.string()
			.required()
			.label("Title"),
		genre: Joi.string()
			.required()
			.label("Genre"),
		numberInStock: Joi.number()
			.min(0)
			.max(100)
			.required()
			.label("Stock"),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("Rate")
	};

	doSubmit = () => {
		console.log(this.state.data);
		this.props.onSubmit(this.state.data, this.props.history);
	};

	render() {
		const genres = [{ name: "", _id: "" }, ...this.props.genres];
		console.log(this.props);
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSeletList("genre", "Genre", genres)}
					{this.renderInput("numberInStock", "Number In Stock")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default NewMovieForm;
