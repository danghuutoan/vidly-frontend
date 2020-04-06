import React, { Component } from "react";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import SearchBar from "./common/searchBar";

class Movie extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		selectedGenre: null,
		searchQuery: "",
		sortColumn: { path: "title", order: " asc" }
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		const movies = getMovies();
		this.setState({
			movies,
			genres,
			selectedGenre: genres[0]
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
		this.setState({
			selectedGenre: genre,
			searchQuery: "",
			currentPage: 1
		});
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	handleSearch = query => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1
		});
		console.log(query);
	};

	getPageData = () => {
		const {
			currentPage,
			pageSize,
			selectedGenre,
			searchQuery,
			sortColumn,
			movies: allMovies
		} = this.state;

		let filteredMovies = allMovies;

		if (searchQuery) {
			filteredMovies = allMovies.filter(m =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			filteredMovies = allMovies.filter(
				movie => movie.genre._id === selectedGenre._id
			);
		}

		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(sortedMovies, currentPage, pageSize);
		return { totalCount: filteredMovies.length, data: movies };
	};
	render() {
		const {
			currentPage,
			genres,
			pageSize,
			selectedGenre,
			searchQuery,
			sortColumn
		} = this.state;

		const { length: count } = this.state.movies;
		if (count === 0) {
			return <p> There are no movies in the collection </p>;
		}

		const { totalCount, data: movies } = this.getPageData();

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
							<p>Showing {totalCount} movies in the database</p>
							<SearchBar
								value={searchQuery}
								onChange={this.handleSearch}
							/>
							<MovieTable
								onDelete={this.handleDelete}
								onLike={this.handleLike}
								movies={movies}
								onSort={this.handleSort}
								sortColumn={sortColumn}
							/>
							<Pagination
								itemCount={totalCount}
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
