import React, { Component } from "react";

class Like extends Component {
	render() {
		let classes = "fa fa-heart";
		if (this.props.liked !== true) classes += "-o";
		return (
			<i
				className={classes}
				onClick={() => {
					this.props.onClick(this.props.movie);
				}}
				aria-hidden="true"
			></i>
		);
	}
}

export default Like;
