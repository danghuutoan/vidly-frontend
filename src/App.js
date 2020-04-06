import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navbar";
import Movie from "./components/movie";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

class App extends Component {
	items = [
		{ name: "Movies", path: "/movies" },
		{ name: "Customers", path: "/customers" },
		{ name: "Rentals", path: "/rentals" },
		{ name: "Login", path: "/login" },
		{ name: "Register", path: "/register" }
	];

	render() {
		return (
			<React.Fragment>
				<NavBar items={this.items} />
				<main className="container">
					<div className="content">
						<Switch>
							<Route path="/login" component={LoginForm} />
							<Route path="/movies/:id" component={MovieForm} />

							<Route path="/register" component={RegisterForm} />
							<Route path="/movies" component={Movie} />
							<Route path="/customers" component={Customer} />
							<Route path="/rentals" component={Rental} />
							<Route path="/not-found" component={NotFound} />
							<Redirect from="/" exact to="/movies" />
							<Redirect to="/not-found" />
						</Switch>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
