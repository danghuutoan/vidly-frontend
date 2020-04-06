import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres, getGenre } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

import Movie from "./movie";
import { getMovies } from "../services/fakeMovieService";

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
		const data = { ...this.state.data };

		const movie = getMovie(this.props.match.params.id);
		console.log(movie, this.props.match.params.id);
		data._id = movie._id;
		data.genreId = movie.genre._id;
		data.title = movie.title;
		data.numberInStock = movie.numberInStock;
		data.dailyRentalRate = movie.dailyRentalRate;

		// console.log("movie form mounted");
		const genres = getGenres();
		this.setState({ genres, data });
	}
	doSubmit = () => {
		console.log("submitted");
		this.props.history.push("/movies");
	};
	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie Form {this.props.match.params.id}</h1>
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
