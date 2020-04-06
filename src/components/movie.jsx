import React, { Component } from "react";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		selectedGenre: { name: "All Genres" },
		sortColumn: { path: "title", order: " asc" }
	};

	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: [{ _id: "", name: "All Genres" }, ...getGenres()]
		});
	}
	handleDelete = movie => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};
	render() {
		const {
			currentPage,
			genres,
			pageSize,
			selectedGenre,
			sortColumn,
			movies: allMovies
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter(
						movie => movie.genre._id === selectedGenre._id
				  )
				: allMovies;
		const { length: count } = filteredMovies;
		if (count === 0) return <p> There are no movies in the collection </p>;
		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);
		const movies = paginate(sortedMovies, currentPage, pageSize);

		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col-3">
							<ListGroup
								selectedItem={selectedGenre}
								onItemSelect={this.handleGenreSelect}
								items={genres}
							/>
						</div>
						<div className="col">
							<Link
								to="/movies/new"
								className="btn btn-primary"
								style={{ marginBottom: 20 }}
							>
								New Movie
							</Link>
							<p>Showing {count} movies in the database</p>
							<MovieTable
								onDelete={this.handleDelete}
								onLike={this.handleLike}
								movies={movies}
								onSort={this.handleSort}
								sortColumn={sortColumn}
							/>
							<Pagination
								itemCount={filteredMovies.length}
								pageSize={pageSize}
								onPageChange={this.handlePageChange}
								currentPage={currentPage}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movie;
