import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: ""
		},
		genres: [],
		errors: {}
	};
	schema = {
		_id: Joi.string(),
		title: Joi.string()
			.required()
			.label("Title"),
		genreId: Joi.string()
			.required()
			.label("Genre Id"),
		numberInStock: Joi.string()
			.min(0)
			.max(100)
			.required()
			.label("Number In Stock"),
		dailyRentalRate: Joi.string()
			.min(0)
			.max(10)
			.label("Daily Rental Rate")
	};
	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });

		const { id } = this.props.match.params;
		if (id === "new") return;
		const movie = getMovie(id);
		if (!movie) return this.props.history.replace("/not-found");

		this.setState({ data: this.mapToViewModel(movie) });
	}

	mapToViewModel = movie => {
		return {
			_id: movie._id,
			genreId: movie.genre._id,
			title: movie.title,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	};
	doSubmit = () => {
		saveMovie(this.state.data);
		this.props.history.push("/movies");
	};
	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie Form </h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSeletList("genreId", "Genres", genres)}
					{this.renderInput("numberInStock", "Stock")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default MovieForm;
