import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class NavBar extends Component {
	state = { selectedItem: "" };
	onItemSelect = item => {
		console.log(item);
		this.setState({ selectedItem: item.path });
	};
	renderItems = items => {
		return items.map(item => (
			<li
				key={item.name}
				className={
					item.path === this.state.selectedItem
						? "nav-item active"
						: "nav-item"
				}
				onClick={() => this.onItemSelect(item)}
			>
				<NavLink className="nav-link" to={item.path}>
					{item.name}
				</NavLink>
			</li>
		));
	};
	render() {
		const { items } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="/">
					Vidly
				</Link>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">{this.renderItems(items)}</ul>
				</div>
			</nav>
		);
	}
}

export default NavBar;
