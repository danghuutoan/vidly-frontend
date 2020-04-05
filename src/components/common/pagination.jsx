import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Pagination extends Component {
	render() {
		const { itemCount, pageSize, currentPage, onPageChange } = this.props;
		const pageCount = Math.ceil(itemCount / pageSize);
		if (pageCount === 1) return null;
		const pages = _.range(1, pageCount + 1);
		return (
			<nav aria-label="...">
				<ul className="pagination pagination-lg">
					{pages.map(page => (
						<li
							key={page}
							className={
								page === currentPage
									? "page-item active"
									: "page-item"
							}
						>
							<button
								onClick={() => onPageChange(page)}
								className="page-link"
							>
								{page}
							</button>
						</li>
					))}
				</ul>
			</nav>
		);
	}
}

Pagination.propTypes = {
	itemCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};
export default Pagination;
